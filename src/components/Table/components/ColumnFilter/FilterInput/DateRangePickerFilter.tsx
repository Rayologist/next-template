import { DateRangePicker } from '@mantine/dates';
import { DateRangePickerFilterProps } from 'types';

const DateRangePickerFilter = (props: DateRangePickerFilterProps) => {
  const { filterValue, setFilterValue, ...rest } = props;
  return (
    <DateRangePicker
      value={filterValue ?? [null, null]}
      onChange={(value) => setFilterValue(value)}
      {...rest}
    />
  );
};

export default DateRangePickerFilter;
