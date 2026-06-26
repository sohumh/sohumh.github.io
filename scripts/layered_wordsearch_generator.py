#!/usr/bin/env python3
"""Generate layered word-search grids from a word list.

The generator treats each word like a "fry" dropped onto a board.  A word is a
straight line in one of 8 directions.  When it lands, each letter is placed on
top of the current stack for that cell, so one word can naturally cascade across
several visible layers depending on what is already underneath it.

Output layers are ordered top-to-bottom, which is the format expected by the
Layered Word Search UI.  Empty lower-layer cells are filled with random decoy
letters by default; empty cells above real letters are never filled, because that
would make the hidden word impossible to uncover.
"""

from __future__ import annotations

import argparse
import json
import random
import string
import sys
from dataclasses import dataclass
from typing import Iterable, List, Sequence, Tuple

Direction = Tuple[int, int]
Path = Tuple[Tuple[int, int], ...]
DIRECTIONS: Sequence[Direction] = (
    (0, 1),   # E
    (1, 0),   # S
    (1, 1),   # SE
    (1, -1),  # SW
    (0, -1),  # W
    (-1, 0),  # N
    (-1, -1), # NW
    (-1, 1),  # NE
)
DIRECTION_NAMES = {
    (0, 1): "E",
    (1, 0): "S",
    (1, 1): "SE",
    (1, -1): "SW",
    (0, -1): "W",
    (-1, 0): "N",
    (-1, -1): "NW",
    (-1, 1): "NE",
}
VOWELS = set("AEIOU")


def orientation(direction: Direction) -> Tuple[int, int]:
    """Normalize opposite directions into the same orientation bucket."""
    dr, dc = direction
    if dr < 0 or (dr == 0 and dc < 0):
        dr, dc = -dr, -dc
    return dr, dc


@dataclass(frozen=True)
class Candidate:
    score: float
    row: int
    col: int
    direction: Direction
    path: Tuple[Tuple[int, int], ...]
    heights: Tuple[int, ...]


@dataclass
class Placement:
    word: str
    row: int
    col: int
    direction: str
    path: List[Tuple[int, int]]
    stack_heights_before: List[int]
    final_layers_top_to_bottom: List[int]


def clean_words(raw_words: Iterable[str]) -> List[str]:
    words: List[str] = []
    seen = set()
    for raw in raw_words:
        word = "".join(ch for ch in raw.upper() if ch.isalnum())
        if word and word not in seen:
            seen.add(word)
            words.append(word)
    return words


def read_words(args: argparse.Namespace) -> List[str]:
    pieces: List[str] = []
    if args.words:
        pieces.extend(args.words)
    if args.word_file:
        with open(args.word_file, "r", encoding="utf-8") as handle:
            pieces.extend(handle.read().replace(",", " ").split())
    return clean_words(pieces)


def in_bounds(row: int, col: int, rows: int, cols: int) -> bool:
    return 0 <= row < rows and 0 <= col < cols


def path_for(row: int, col: int, direction: Direction, length: int, rows: int, cols: int):
    dr, dc = direction
    path = []
    for i in range(length):
        rr = row + dr * i
        cc = col + dc * i
        if not in_bounds(rr, cc, rows, cols):
            return None
        path.append((rr, cc))
    return tuple(path)


def choose_decoy(rng: random.Random, avoid: str | None = None) -> str:
    # Slightly vowel-heavy filler looks more like a real word-search grid.
    alphabet = "EEEEAAAIOOUU" + string.ascii_uppercase
    letter = rng.choice(alphabet)
    if avoid and letter == avoid:
        choices = [ch for ch in alphabet if ch != avoid]
        letter = rng.choice(choices)
    return letter


def score_candidate(
    word: str,
    path: Tuple[Tuple[int, int], ...],
    direction: Direction,
    stacks: List[List[List[str]]],
    max_layers: int,
    direction_counts: dict[Direction, int],
    rng: random.Random,
) -> float:
    heights = [len(stacks[r][c]) for r, c in path]
    if any(height >= max_layers for height in heights):
        return float("-inf")

    occupied = sum(1 for height in heights if height > 0)
    coverage = sum(1 for height in heights if height == 0)
    avg_height = sum(heights) / len(heights)
    varied_layers = len(set(heights))
    diagonal = direction[0] != 0 and direction[1] != 0
    least_used_bonus = 1.0 / (1 + direction_counts.get(direction, 0))

    # Prefer words that stack on top of existing words, but keep some pressure
    # toward unused cells so the board does not become one tiny tower.
    score = 0.0
    score += occupied * 5.0
    score += coverage * 1.3
    score += avg_height * 3.0
    score += varied_layers * 4.0
    score += least_used_bonus * 6.0
    score += (2.5 if diagonal else 0.8)

    # Reusing a row/column/lane too perfectly can make a dull puzzle.  A little
    # randomness breaks ties and makes repeated generations varied.
    score += rng.random() * 1.25
    return score


def generate_layers(
    words: Sequence[str],
    rows: int = 8,
    cols: int = 8,
    max_layers: int = 4,
    attempts_per_word: int = 900,
    seed: int | None = None,
    fill_decoys: bool = True,
    final_message: str | None = None,
):
    if rows <= 0 or cols <= 0 or max_layers <= 0:
        raise ValueError("rows, cols, and layers must be positive")
    if not words:
        raise ValueError("provide at least one word")
    if max(len(word) for word in words) > max(rows, cols):
        raise ValueError("at least one word is longer than both grid dimensions")

    rng = random.Random(seed)
    # Bottom-to-top stacks.  Converting to display layers reverses each stack.
    stacks: List[List[List[Tuple[str, str, int]]]] = [[[] for _ in range(cols)] for _ in range(rows)]
    direction_counts = {direction: 0 for direction in DIRECTIONS}
    placements: List[Placement] = []
    used_paths: set[Path] = set()
    placed_lines: List[Tuple[Tuple[int, int], set[Tuple[int, int]], int]] = []
    skipped: List[str] = []

    # Long words first: they are the hardest fries to land cleanly.
    ordered_words = sorted(words, key=lambda w: (-len(w), w))

    for word in ordered_words:
        valid_dirs = [d for d in DIRECTIONS if path_for(0, 0, d, 1, rows, cols) is not None]
        best: Candidate | None = None

        for _ in range(attempts_per_word):
            direction = rng.choice(valid_dirs)
            start_row = rng.randrange(rows)
            start_col = rng.randrange(cols)
            path = path_for(start_row, start_col, direction, len(word), rows, cols)
            if not path:
                continue
            canonical_path = min(path, tuple(reversed(path)))
            if canonical_path in used_paths:
                continue
            candidate_orientation = orientation(direction)
            candidate_cells = set(path)
            too_much_same_orientation_overlap = any(
                existing_orientation == candidate_orientation
                and len(candidate_cells & existing_cells) / min(len(candidate_cells), existing_length) >= 0.25
                for existing_orientation, existing_cells, existing_length in placed_lines
            )
            if too_much_same_orientation_overlap:
                continue
            heights = tuple(len(stacks[r][c]) for r, c in path)
            if any(height >= max_layers for height in heights):
                continue
            score = score_candidate(word, path, direction, stacks, max_layers, direction_counts, rng)
            if best is None or score > best.score:
                best = Candidate(score, start_row, start_col, direction, path, heights)

        if best is None:
            skipped.append(word)
            continue

        for letter_index, (letter, (row, col)) in enumerate(zip(word, best.path)):
            stacks[row][col].append((letter, word, letter_index))
        used_paths.add(min(best.path, tuple(reversed(best.path))))
        placed_lines.append((orientation(best.direction), set(best.path), len(best.path)))
        direction_counts[best.direction] += 1
        placements.append(
            Placement(
                word=word,
                row=best.row,
                col=best.col,
                direction=DIRECTION_NAMES[best.direction],
                path=list(best.path),
                stack_heights_before=list(best.heights),
                final_layers_top_to_bottom=[],
            )
        )

    solution_layers = max((len(stacks[r][c]) for r in range(rows) for c in range(cols)), default=1)
    solution_layers = max(1, min(max_layers, solution_layers))
    message = ''.join(ch for ch in (final_message or '').upper() if ch.isalnum())
    has_message_layer = bool(message)
    actual_layers = solution_layers + (1 if has_message_layer else 0)

    layers: List[List[List[str]]] = [[['' for _ in range(cols)] for _ in range(rows)] for _ in range(actual_layers)]
    for row in range(rows):
        for col in range(cols):
            stack = stacks[row][col]
            for depth in range(solution_layers):
                if depth < len(stack):
                    layers[depth][row][col] = stack[-1 - depth][0]
                else:
                    # Empty space above the final message must stay empty, not
                    # decoy-filled, otherwise it would block the end message.
                    layers[depth][row][col] = "."
            if has_message_layer:
                message_index = row * cols + col
                layers[solution_layers][row][col] = message[message_index % len(message)]
            elif fill_decoys:
                for depth in range(solution_layers):
                    if layers[depth][row][col] == ".":
                        layers[depth][row][col] = choose_decoy(rng)

    # If there is no final message, fill completely unused top cells with decoys.
    if fill_decoys and not has_message_layer:
        for row in range(rows):
            for col in range(cols):
                if not stacks[row][col]:
                    layers[0][row][col] = choose_decoy(rng)

    layer_strings = [
        ["".join(cell if cell else "." for cell in row) for row in layer]
        for layer in layers
    ]

    for placement in placements:
        final_depths: List[int] = []
        for letter_index, (row, col) in enumerate(placement.path):
            stack = stacks[row][col]
            depth = next(
                actual_depth
                for actual_depth, entry in enumerate(reversed(stack))
                if entry[1] == placement.word and entry[2] == letter_index
            )
            final_depths.append(depth)
        placement.final_layers_top_to_bottom = final_depths

    output = {
        "rows": rows,
        "cols": cols,
        "layerCount": actual_layers,
        "solutionLayerCount": solution_layers,
        "finalMessage": message,
        "layers": layer_strings,
        "words": sorted([p.word for p in placements]),
        "skipped": skipped,
        "placements": [placement.__dict__ for placement in placements],
        "layerText": "\n\n".join("\n".join(layer) for layer in layer_strings),
        "wordText": " ".join(sorted([p.word for p in placements])),
    }
    return output


def main(argv: Sequence[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Generate a layered word-search puzzle.")
    parser.add_argument("words", nargs="*", help="Words to place. You can also use --word-file.")
    parser.add_argument("--word-file", help="File containing words separated by whitespace or commas.")
    parser.add_argument("--rows", type=int, default=8)
    parser.add_argument("--cols", type=int, default=8)
    parser.add_argument("--layers", type=int, default=4, help="Maximum stack depth/layers.")
    parser.add_argument("--seed", type=int, default=None, help="Seed for reproducible puzzles.")
    parser.add_argument("--attempts", type=int, default=900, help="Random placement attempts per word.")
    parser.add_argument("--no-decoys", action="store_true", help="Use dots instead of harmless decoy filler.")
    parser.add_argument("--final-message", help="Optional row-major message revealed after all words are solved.")
    parser.add_argument("--format", choices=("json", "text"), default="json")
    args = parser.parse_args(argv)

    words = read_words(args)
    try:
        puzzle = generate_layers(
            words,
            rows=args.rows,
            cols=args.cols,
            max_layers=args.layers,
            attempts_per_word=args.attempts,
            seed=args.seed,
            fill_decoys=not args.no_decoys,
            final_message=args.final_message,
        )
    except ValueError as error:
        print(f"error: {error}", file=sys.stderr)
        return 2

    if args.format == "text":
        print("LAYERS")
        print(puzzle["layerText"])
        print("\nWORDS")
        print(puzzle["wordText"])
        if puzzle["skipped"]:
            print("\nSKIPPED")
            print(" ".join(puzzle["skipped"]))
    else:
        print(json.dumps(puzzle, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
