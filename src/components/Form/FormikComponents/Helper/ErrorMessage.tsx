import { Group, Text, TextProps } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

const ErrorMessage = (props: { text: string; textProps?: TextProps }) => {
  const { text, textProps } = props;
  return (
    <Group spacing={5} sx={{ position: 'absolute' }}>
      <IconAlertCircle width={18} />
      <Text weight={500} size="sm" {...textProps}>
        {text}
      </Text>
    </Group>
  );
};

export default ErrorMessage;
