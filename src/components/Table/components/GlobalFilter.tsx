import { memo } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const GlobalFilter = (props: TextInputProps) => {
  const Icon = memo(() => <IconSearch size={14} stroke={1.5} />);
  return <TextInput placeholder="Search" icon={<Icon />} {...props} />;
};

export default GlobalFilter;
