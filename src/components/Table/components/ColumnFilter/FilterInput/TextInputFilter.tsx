import { TextInput, CloseButton } from '@mantine/core';
import { TextInputFilterProps } from 'types';

export default function TextInputFilter(props: TextInputFilterProps) {
  const { filterValue, setFilterValue, ...rest } = props;
  const rightSection = filterValue ? (
    <CloseButton onClick={() => setFilterValue('')} size="sm" />
  ) : (
    ' '
  );

  return (
    <TextInput
      value={filterValue ?? ''}
      onChange={(e) => setFilterValue(e.target.value)}
      rightSection={rightSection}
      {...rest}
    />
  );
}
