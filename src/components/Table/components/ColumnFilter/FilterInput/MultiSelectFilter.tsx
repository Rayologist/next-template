import { MultiSelect } from '@mantine/core';
import { MultiSelectFilterProps } from 'types';

const MultiSelectFilter = (props: MultiSelectFilterProps) => {
  const { filterValue, setFilterValue, ...rest } = props;
  return (
    <MultiSelect value={filterValue} onChange={(value) => setFilterValue(value ?? [])} {...rest} />
  );
};

export default MultiSelectFilter;
