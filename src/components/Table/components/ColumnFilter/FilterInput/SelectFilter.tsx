import { Select } from '@mantine/core';
import { SelectFilterProps } from 'types';

const SelectFilter = (props: SelectFilterProps) => {
  const { filterValue, setFilterValue, ...rest } = props;
  return <Select value={filterValue} onChange={(value) => setFilterValue(value ?? '')} {...rest} />;
};

export default SelectFilter;
