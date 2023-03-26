import { DatePickerInput } from '@mantine/dates';
import { DatePickerFilterProps } from 'types';

const DateRangePickerFilter = (props: DatePickerFilterProps<'range'>) => {
  const { filterValue, setFilterValue, ...rest } = props;
  return (
    <DatePickerInput
      type="range"
      value={filterValue ?? [null, null]}
      onChange={(value) => setFilterValue(value)}
      {...rest}
    />
  );
};

export default DateRangePickerFilter;
