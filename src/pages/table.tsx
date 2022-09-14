import Table from '@components/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { faker } from '@faker-js/faker';
import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { Container, Paper, Text } from '@mantine/core';
import Loader from '@components/UI/Loader';

type FakeUser = {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  email: string;
  music: string;
  createdAt: Date;
  updatedAt: Date;
};

function createFakeUser(id: number): FakeUser {
  const createdAt = faker.date.past(5, new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 2));
  const updatedAt = faker.date.future(2, createdAt);
  return {
    id: id + 1,
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
  columnHelper.accessor((row) => row.id.toString(), {
    header: 'Id',
    maxSize: 100,
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    minSize: 150,
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    minSize: 150,
  }),
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    header: 'Full Name',
    minSize: 200,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (props) => <Text sx={{ wordWrap: 'break-word' }}>{props.getValue()}</Text>,
    minSize: 200,
  }),
  columnHelper.accessor('sex', {
    header: 'Sex',
    filterFn: 'equalsString',
    minSize: 150,
    meta: {
      filterInput: {
        type: 'select',
        props: {
          clearable: true,
        },
      },
    },
  }),
  columnHelper.accessor('music', {
    header: 'Music Genre',
    minSize: 200,
    filterFn: 'arrIncludesSome',
    meta: {
      filterInput: {
        type: 'multi-select',
        props: {
          clearable: true,
          searchable: true,
        },
      },
    },
  }),
  columnHelper.accessor((row) => format(new Date(row.createdAt), 'yyyy-MM-dd HH:mm:ss'), {
    header: 'Creation Time',
    minSize: 200,
    filterFn: 'inDateRange',
    meta: {
      filterInput: {
        type: 'date',
        props: {
          clearable: true,
          initialLevel: 'year',
        },
      },
    },
  }),
  columnHelper.accessor((row) => format(new Date(row.updatedAt), 'yyyy-MM-dd HH:mm:ss'), {
    header: 'Last Updated',
    minSize: 200,
  }),
];

function TableSample() {
  const [data, setData] = useState<FakeUser[]>();

  useEffect(() => {
    const dt: FakeUser[] = [];
    Array.from({ length: 10000 }).forEach((_, index) => dt.push(createFakeUser(index)));
    setData(dt);
  }, []);

  if (!data) return <Loader />;

  return (
    <Container>
      <Paper withBorder sx={{ padding: '1rem' }}>
        <Table data={data} columns={columns} />
      </Paper>
    </Container>
  );
}

export default TableSample;
