#!/usr/bin/env python3
"""Split a private outreach CSV into smaller batch files.

Usage:
  python scripts/split_csv_batches.py --input files/employers.csv --output files/batches --batch-size 50

Keep real CSVs under files/ or another ignored directory. Do not commit private
contact data to GitHub.
"""

import argparse
import csv
from pathlib import Path


def parse_args():
    parser = argparse.ArgumentParser(description="Split a CSV into numbered batch files.")
    parser.add_argument("--input", required=True, help="Path to the source CSV.")
    parser.add_argument("--output", required=True, help="Directory for batch CSV files.")
    parser.add_argument("--batch-size", type=int, default=50, help="Rows per batch.")
    return parser.parse_args()


def read_csv(path):
    with path.open("r", newline="", encoding="utf-8-sig") as csv_file:
        reader = csv.DictReader(csv_file)
        rows = list(reader)
        return reader.fieldnames, rows


def write_csv(path, fieldnames, rows):
    with path.open("w", newline="", encoding="utf-8") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main():
    args = parse_args()
    input_path = Path(args.input)
    output_dir = Path(args.output)

    if args.batch_size < 1:
        raise ValueError("--batch-size must be at least 1")
    if not input_path.exists():
        raise FileNotFoundError(f"Input CSV not found: {input_path}")

    fieldnames, rows = read_csv(input_path)
    if not fieldnames:
        raise ValueError(f"Input CSV has no header row: {input_path}")

    output_dir.mkdir(parents=True, exist_ok=True)

    created = []
    for batch_number, start in enumerate(range(0, len(rows), args.batch_size), start=1):
        batch_rows = rows[start : start + args.batch_size]
        end = start + len(batch_rows)
        output_path = output_dir / f"batch_{batch_number:03d}_rows_{start + 1}_to_{end}.csv"
        write_csv(output_path, fieldnames, batch_rows)
        created.append(output_path)

    print(f"Total rows: {len(rows)}")
    print(f"Batch size: {args.batch_size}")
    print(f"Files created: {len(created)}")
    print(f"Output directory: {output_dir}")


if __name__ == "__main__":
    main()
