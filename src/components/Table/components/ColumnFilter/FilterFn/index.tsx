import { FilterFn } from '@tanstack/react-table';

// `testFalsey` from https://github.com/TanStack/table/blob/main/packages/table-core/src/filterFns.ts#L139
function testFalsey(val: any) {
  return val === undefined || val === null || val === '';
}

export const inDateRange: FilterFn<any> = (
  row,
  columnId,
  filterValue: [Date | null, Date | null]
) => {
  const [min, max] = filterValue ?? [null, null];
  if (!min || !max) return false;

  const rowValue = row.getValue<string>(columnId);
  const rowValueTimestamp = new Date(rowValue).getTime();
  const minTimestamp = min.getTime();
  const maxTimestamp = max.getTime();
  const ONE_DAY = 1000 * 60 * 60 * 24;

  if (minTimestamp === maxTimestamp) {
    return rowValueTimestamp >= minTimestamp && rowValueTimestamp <= minTimestamp + ONE_DAY;
  }

  return rowValueTimestamp >= minTimestamp && rowValueTimestamp <= maxTimestamp;
};

inDateRange.autoRemove = (val) => testFalsey(val) || (testFalsey(val[0]) && testFalsey(val[1]));
