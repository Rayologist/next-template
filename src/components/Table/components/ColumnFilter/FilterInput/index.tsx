import { FilterInput, InputFilterProps } from 'types';
import { Column } from '@tanstack/react-table';
import DateRangePickerFilter from './DateRangePickerFilter';
import SelectFilter from './SelectFilter';
import TextInputFilter from './TextInputFilter';
import MultiSelectFilter from './MultiSelectFilter';

type GetFilterInputProps = {
  filterInput: FilterInput;
  state: InputFilterProps<any>;
  column: Column<any, unknown>;
};

export default function getFilterInput({ filterInput, state, column }: GetFilterInputProps) {
  const { filterValue, setFilterValue } = state;
  const { type, props: filterInputProps } = filterInput;

  const uniqueValue = Array.from(column.getFacetedUniqueValues().keys());

  switch (type) {
    case 'text':
      return <TextInputFilter {...state} {...filterInputProps} />;
    case 'select': {
      const selectData = uniqueValue.map((value) => ({ label: value, value }));
      return <SelectFilter data={selectData} {...state} {...filterInputProps} />;
    }
    case 'date': {
      let minmax = column.getFacetedMinMaxValues() as unknown as [Date, Date] | undefined;
      if (!minmax) {
        minmax = [new Date(0), new Date()];
      }

      return (
        <DateRangePickerFilter
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          allowSingleDateInRange
          minDate={new Date(minmax[0])}
          maxDate={new Date(minmax[1])}
          {...filterInputProps}
        />
      );
    }
    case 'multi-select': {
      const multiSelectData = uniqueValue.map((value) => ({ label: value, value }));
      return <MultiSelectFilter {...state} data={multiSelectData} {...filterInputProps} />;
    }
    default:
      return null;
  }
}

export { DateRangePickerFilter, SelectFilter, TextInputFilter, MultiSelectFilter };
