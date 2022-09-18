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
  ScrollAreaProps,
  TableProps as MantineTableProps,
  TextProps,
} from '@mantine/core';

import useStyles from './styles';
import SortingIcon from './components/SortingIcon';
import GlobalFilter from './components/GlobalFilter';
import ColumnToggle from './components/ColumnToggle';
import ColumnFilter from './components/ColumnFilter';
import { inDateRange } from './components/ColumnFilter/FilterFn';

type TableProps<T extends RowData> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  height?: string | number;
  scrollAreaProps?: ScrollAreaProps;
  lineClamp?: TextProps['lineClamp'];
} & MantineTableProps;

function Table<T extends RowData>(props: TableProps<T>) {
  const { data, columns, height, scrollAreaProps, lineClamp = 1, ...mantineTableProps } = props;

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
    columnResizeMode: 'onChange',
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
          {headerGroup.headers.map((header) => {
            const isResizing = header.column.getIsResizing();
            return (
              <th className={classes.th} key={header.id} style={{ width: header.getSize() }}>
                <Group spacing={0}>
                  <UnstyledButton
                    onClick={header.column.getToggleSortingHandler()}
                    className={classes.control}
                    sx={{ flexGrow: 1 }}
                  >
                    <Group position="apart" spacing={0}>
                      <Text weight={500} size="sm" lineClamp={lineClamp}>
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
                  {header.column.getCanResize() && (
                    <Divider
                      orientation="vertical"
                      variant={isResizing ? 'solid' : 'dashed'}
                      size={isResizing ? 'xl' : 'xs'}
                      mx={10}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      sx={{
                        userSelect: 'none',
                        touchAction: 'none',
                        cursor: 'col-resize',
                        '&:hover': {
                          borderLeftWidth: '4px',
                          borderLeftStyle: 'solid',
                        },
                      }}
                    />
                  )}
                </Group>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  ));

  const TB = memo(() => (
    <tbody>
      {table.getRowModel().rows.length > 0 ? (
        <>
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
                  <td key={cell.id}>
                    <Text lineClamp={lineClamp}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Text>
                  </td>
                ))}
              </tr>
            );
          })}

          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </>
      ) : (
        <tr>
          <td colSpan={table.getVisibleLeafColumns().length}>
            <Text weight={500} align="center">
              Nothing found
            </Text>
          </td>
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
          getIsSomeColumnsVisible={table.getIsSomeColumnsVisible}
          getAllLeafColumns={table.getAllLeafColumns}
          toggleAllColumnsVisible={table.toggleAllColumnsVisible}
        />
      </Group>

      <ScrollArea
        viewportRef={tableContainerRef}
        type="scroll"
        style={{ height: height ?? 550 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        {...scrollAreaProps}
      >
        <MantineTable
          horizontalSpacing="lg"
          verticalSpacing="xs"
          sx={{ tableLayout: 'fixed' }}
          highlightOnHover
          {...mantineTableProps}
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
