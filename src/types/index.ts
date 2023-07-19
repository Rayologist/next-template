import { Dispatch, SetStateAction } from 'react';
import {
  MultiSelectProps as MantineMultiSelectProps,
  SelectProps as MantineSelectProps,
  TextInputProps as MantineTextInputProps,
} from '@mantine/core';
import {
  DatePickerInputProps as MantineDatePickerInputProps,
  DatePickerValue,
  DatePickerType,
} from '@mantine/dates';
import { RowData } from '@tanstack/react-table';
import { inDateRange } from '@components/Table/components/ColumnFilter/FilterFn';
import FilterInput from '@components/Table/components/ColumnFilter/FilterInput';

// ------@tanstack/react-table compoenent types------
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterInput?: FilterInput;
  }
  interface FilterFns {
    inDateRange: typeof inDateRange;
  }
}

export type InputFilterProps<T> = {
  filterValue: T;
  setFilterValue: Dispatch<SetStateAction<T>>;
};

export type OmitValueAndOnChange<T> = Omit<T, 'value' | 'onChange'>;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type TextInputFilter = OmitValueAndOnChange<MantineTextInputProps>;
export type TextInputFilterProps = InputFilterProps<string> & TextInputFilter;

export type SelectFilter = OmitValueAndOnChange<MantineSelectProps>;
export type SelectFilterProps = InputFilterProps<string> & SelectFilter;

export type DatePickerInputFilter<Type extends DatePickerType = 'default'> = OmitValueAndOnChange<
  MantineDatePickerInputProps<Type>
>;
export type DatePickerFilterProps<Type extends DatePickerType = 'default'> = InputFilterProps<
  DatePickerValue<Type>
> &
  DatePickerInputFilter<Type>;

export type MultiSelectFilter = OmitValueAndOnChange<MantineMultiSelectProps>;
export type MultiSelectFilterProps = InputFilterProps<string[]> & MultiSelectFilter;

export type FilterInput =
  | {
      type: 'text';
      props?: Partial<TextInputFilter>;
    }
  | {
      type: 'select';
      props?: Partial<SelectFilter>;
      selectData: (
        facetedUniqueValue: Map<any, number>,
        facetedMinMaxValue: undefined | [number, number]
      ) => { label: string; value: any }[];
    }
  | {
      type: 'date';
      props?: Partial<DatePickerInputFilter<'range'>>;
    }
  | {
      type: 'multi-select';
      props?: Partial<MultiSelectFilter>;
      selectData: (
        facetedUniqueValue: Map<any, number>,
        facetedMinMaxValue: undefined | [number, number]
      ) => { label: string; value: any }[];
    };

export type FilterInputType = FilterInput['type'];
