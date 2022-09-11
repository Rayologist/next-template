import Table from '@components/Table';
import { createColumnHelper, filterFns } from '@tanstack/react-table';
import { faker } from '@faker-js/faker';
import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { Container, Paper, Text } from '@mantine/core';
import Loader from '@components/UI/Loader';

type FakeUser = {
  firstName: string;
  lastName: string;
  sex: string;
  email: string;
  music: string;
  createdAt: Date;
  updatedAt: Date;
};

function createFakeUser(): FakeUser {
  const createdAt = faker.date.past(5, new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 2));
  const updatedAt = faker.date.future(2, createdAt);
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    sex: faker.name.sex(),
    email: faker.internet.email(),
    music: faker.music.genre(),
    createdAt,
    updatedAt,
  };
}

const columnHelper = createColumnHelper<FakeUser>();

const columns = [
  columnHelper.display({
    header: 'Id',
    cell: (props) => parseInt(props.cell.row.id, 10) + 1,
    maxSize: 100,
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    minSize: 200,
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    minSize: 200,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (props) => <Text sx={{ wordWrap: 'break-word' }}>{props.getValue()}</Text>,
    minSize: 200,
  }),
  columnHelper.accessor('sex', {
    header: 'Sex',
    filterFn: filterFns.equalsString,
  }),
  columnHelper.accessor('music', {
    header: 'Music Genre',
    minSize: 200,
  }),
  columnHelper.accessor((row) => format(new Date(row.createdAt), 'yyyy-MM-dd hh:mm:ss'), {
    header: 'Creation Time',
    minSize: 200,
  }),
  columnHelper.accessor((row) => format(new Date(row.updatedAt), 'yyyy-MM-dd hh:mm:ss'), {
    header: 'Last Updated',
    minSize: 200,
  }),
];

function TableSample() {
  const [data, setData] = useState<FakeUser[]>();

  useEffect(() => {
    const dt: FakeUser[] = [];
    Array.from({ length: 10000 }).forEach(() => dt.push(createFakeUser()));
    setData(dt);
  }, []);

  if (!data) return <Loader />;

  return (
    <Container sx={{ marginTop: 50 }} size={1200}>
      <Paper withBorder sx={{ padding: '1rem' }}>
        <Table data={data} columns={columns} />
      </Paper>
    </Container>
  );
}

export default TableSample;
