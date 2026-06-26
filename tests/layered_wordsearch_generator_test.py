import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from scripts.layered_wordsearch_generator import generate_layers, orientation

WORDS = "CATS DOGS BIRD FISH MOON STAR TREE WIND FIRE RAIN SNOW ROCK".split()
DIRECTION_BY_NAME = {
    "E": (0, 1),
    "S": (1, 0),
    "SE": (1, 1),
    "SW": (1, -1),
    "W": (0, -1),
    "N": (-1, 0),
    "NW": (-1, -1),
    "NE": (-1, 1),
}


def orientation_name(name):
    return orientation(DIRECTION_BY_NAME[name])


def letter_at(puzzle, depth, row, col):
    return puzzle["layers"][depth][row][col]


def test_generator_places_all_words_and_preserves_metadata():
    puzzle = generate_layers(WORDS, rows=8, cols=8, max_layers=4, seed=7)

    assert puzzle["rows"] == 8
    assert puzzle["cols"] == 8
    assert puzzle["skipped"] == []
    assert sorted(puzzle["words"]) == sorted(WORDS)
    assert len(puzzle["layers"]) <= 4

    for layer in puzzle["layers"]:
        assert len(layer) == 8
        assert all(len(row) == 8 for row in layer)

    for placement in puzzle["placements"]:
        for i, ((row, col), depth) in enumerate(
            zip(placement["path"], placement["final_layers_top_to_bottom"])
        ):
            assert letter_at(puzzle, depth, row, col) == placement["word"][i]


def test_generator_makes_a_more_interesting_layered_puzzle():
    puzzle = generate_layers(WORDS, rows=8, cols=8, max_layers=4, seed=7)
    directions = {placement["direction"] for placement in puzzle["placements"]}
    deepest_solution_layer = max(
        max(placement["final_layers_top_to_bottom"])
        for placement in puzzle["placements"]
    )
    cascading_words = [
        placement
        for placement in puzzle["placements"]
        if len(set(placement["stack_heights_before"])) > 1
    ]

    assert len(directions) >= 4, "expected a mix of directions"
    assert any(direction in directions for direction in {"NE", "NW", "SE", "SW"})
    assert any(direction in directions for direction in {"N", "S", "E", "W"})
    assert deepest_solution_layer >= 2, "expected words hidden multiple layers deep"
    assert cascading_words, "expected at least one word to cascade over varied stack heights"


def test_generator_avoids_directly_stacked_words_and_can_add_message():
    message = "GREATJOBYOUFOUNDALLTHEANIMALSNOWGOCELEBRATEWITHASNACKYAYPUZZLERS"
    puzzle = generate_layers(WORDS, rows=8, cols=8, max_layers=3, seed=1, final_message=message)
    canonical_paths = []
    for placement in puzzle["placements"]:
        path = tuple(tuple(cell) for cell in placement["path"])
        canonical_paths.append(min(path, tuple(reversed(path))))

    assert len(canonical_paths) == len(set(canonical_paths)), "no two words should be placed directly on top of each other"

    for i, first in enumerate(puzzle["placements"]):
        first_cells = {tuple(cell) for cell in first["path"]}
        first_orientation = orientation_name(first["direction"])
        for second in puzzle["placements"][i + 1:]:
            if first_orientation != orientation_name(second["direction"]):
                continue
            second_cells = {tuple(cell) for cell in second["path"]}
            overlap_ratio = len(first_cells & second_cells) / min(len(first_cells), len(second_cells))
            assert overlap_ratio < 0.25, f"{first['word']} and {second['word']} overlap too much"

    assert puzzle["finalMessage"] == message
    assert puzzle["layers"][-1] == [message[i:i + 8] for i in range(0, 64, 8)]


def test_cli_outputs_json():
    result = subprocess.run(
        [
            sys.executable,
            str(ROOT / "scripts" / "layered_wordsearch_generator.py"),
            *WORDS,
            "--rows",
            "8",
            "--cols",
            "8",
            "--layers",
            "4",
            "--seed",
            "7",
        ],
        check=True,
        text=True,
        capture_output=True,
    )
    puzzle = json.loads(result.stdout)
    assert puzzle["wordText"] == " ".join(sorted(WORDS))
    assert "\n\n" in puzzle["layerText"]


if __name__ == "__main__":
    test_generator_places_all_words_and_preserves_metadata()
    test_generator_makes_a_more_interesting_layered_puzzle()
    test_generator_avoids_directly_stacked_words_and_can_add_message()
    test_cli_outputs_json()
    print("Layered word search generator tests passed.")
