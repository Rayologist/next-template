import Loader from '@components/UI/Loader';
import { Container } from '@mantine/core';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@components/RichTextEditor'), {
  ssr: false,
  loading: () => <Loader />,
});

export default function RTE() {
  return (
    <Container size={800}>
      <RichTextEditor />
    </Container>
  );
}
