import { useMemo, useState, useRef, memo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  RowData,
  ColumnFiltersState,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getFacetedRowModel,
} from '@tanstack/react-table';
import {
  Text,
  Table as MantineTable,
  UnstyledButton,
  Group,
  Center,
  ScrollArea,
  Divider,
} from '@mantine/core';

import useStyles from './styles';
import SortingIcon from './components/SortingIcon';
import GlobalFilter from './components/GlobalFilter';
import ColumnToggle from './components/ColumnToggle';
import ColumnFilter from './components/ColumnFilter';
import { inDateRange } from './components/ColumnFilter/FilterFn';

function Table<T extends RowData>({ data, columns }: { data: T[]; columns: ColumnDef<T, any>[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const col = useMemo(() => columns, [columns]);
  const table = useReactTable<T>({
    data,
    columns: col,
    filterFns: {
      inDateRange,
    },
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 50,
    count: rows.length,
  });

  const { getTotalSize, getVirtualItems } = virtualizer;

  const virtualRows = getVirtualItems();
  const totalSize = getTotalSize();

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

  const TH = memo(() => (
    <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th className={classes.th} key={header.id} style={{ width: header.getSize() }}>
              <Group spacing={0}>
                <UnstyledButton
                  onClick={header.column.getToggleSortingHandler()}
                  className={classes.control}
                  sx={{ flexGrow: 1 }}
                >
                  <Group position="apart">
                    <Text weight={500} size="sm">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </Text>
                    {header.column.getCanSort() && (
                      <Center>
                        <SortingIcon
                          sorted={header.column.getIsSorted()}
                          canSort={header.column.getCanSort()}
                          size={14}
                          stroke={1.5}
                        />
                      </Center>
                    )}
                  </Group>
                </UnstyledButton>
                {header.column.getCanFilter() && <ColumnFilter column={header.column} />}
                <Divider orientation="vertical" variant="dashed" mx={5} />
              </Group>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  ));

  const TB = memo(() => (
    <tbody>
      {paddingTop > 0 && (
        <tr>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {virtualRows.map((virtualRow) => {
        const row = rows[virtualRow.index];
        return (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        );
      })}

      {paddingBottom > 0 && (
        <tr>
          <td style={{ height: `${paddingBottom}px` }} />
        </tr>
      )}
    </tbody>
  ));

  return (
    <>
      <Group sx={{ display: 'flex', alignItems: 'center' }} mb="md">
        <GlobalFilter
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          sx={{ flexGrow: 1 }}
        />

        <ColumnToggle<T>
          getIsAllColumnsVisible={table.getIsAllColumnsVisible}
          getAllLeafColumns={table.getAllLeafColumns}
          toggleAllColumnsVisible={table.toggleAllColumnsVisible}
        />
      </Group>

      <ScrollArea
        viewportRef={tableContainerRef}
        type="scroll"
        style={{ height: 600 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <MantineTable
          horizontalSpacing="lg"
          verticalSpacing="xs"
          sx={{ minWidth: 1050, tableLayout: 'fixed' }}
          highlightOnHover
        >
          <TH />
          <TB />
        </MantineTable>
      </ScrollArea>
    </>
  );
}

Table.displayName = 'Table';

export default Table;
