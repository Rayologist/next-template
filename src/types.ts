import { Dispatch, SetStateAction } from 'react';
import {
  PasswordInputProps as MantinePasswordInputProps,
  RadioGroupProps as MantineRadioGroupProps,
  SelectProps as MantineSelectProps,
  TextareaProps as MantineTextareaProps,
  TextInputProps as MantineTextInputProps,
  CheckboxGroupProps as MantineCheckboxGroupProps,
  NumberInputProps as MantineNumberInputProps,
  MultiSelectProps as MantineMultiSelectProps,
  FileInputProps as MantineFileInputProps,
  ColProps,
} from '@mantine/core';
import {
  DatePickerProps as MantineDatePickerProps,
  DateRangePickerProps as MantineDateRangePickerProps,
  DateRangePickerValue,
} from '@mantine/dates';
import { RowData } from '@tanstack/react-table';
import { inDateRange } from '@components/Table/components/ColumnFilter/FilterFn';
import FilterInput from '@components/Table/components/ColumnFilter/FilterInput';

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

export type DateRangePickerFilter = OmitValueAndOnChange<MantineDateRangePickerProps>;
export type DateRangePickerFilterProps = InputFilterProps<DateRangePickerValue> &
  DateRangePickerFilter;

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
    }
  | {
      type: 'date';
      props?: Partial<DateRangePickerFilter>;
    }
  | {
      type: 'multi-select';
      props?: Partial<MultiSelectFilter>;
    };

export type FilterInputType = FilterInput['type'];

export type Option = {
  label: string;
  value: any;
};

export interface Options {
  options: Option[];
}

export type Controlled<T> = { label: string; name: string } & T;

export type TextInputProps = Controlled<MantineTextInputProps>;
export type PasswordInputProps = Controlled<MantinePasswordInputProps>;
export type TextareaProps = Controlled<MantineTextareaProps>;
export type NumberInputProps = Controlled<MantineNumberInputProps>;
export type DatePickerProps = Controlled<MantineDatePickerProps>;
export type FileInputProps<T extends boolean> = Controlled<MantineFileInputProps<T>>;
export type SelectProps = Controlled<
  Omit<MantineSelectProps, 'data'> & {
    options: MantineSelectProps['data'];
  }
>;
export type CheckboxGroupProps = Controlled<Omit<MantineCheckboxGroupProps, 'children'> & Options>;
export type RadioGroupProps = Controlled<Omit<MantineRadioGroupProps, 'children'> & Options>;
export type MultiSelectProps = Controlled<
  Omit<MantineMultiSelectProps, 'data'> & {
    options: MantineMultiSelectProps['data'];
  }
>;

export type ControllerProps =
  | ({ control: 'text-input' } & TextInputProps)
  | ({ control: 'password-input' } & PasswordInputProps)
  | ({ control: 'select' } & SelectProps)
  | ({ control: 'checkbox-group' } & CheckboxGroupProps)
  | ({ control: 'radio-group' } & RadioGroupProps)
  | ({ control: 'text-area' } & TextareaProps)
  | ({ control: 'date-picker' } & DatePickerProps)
  | ({ control: 'number-input' } & NumberInputProps)
  | ({ control: 'multi-select' } & MultiSelectProps)
  | ({ control: 'file-input' } & FileInputProps<boolean>);

export type ControllerPropsWithCol = {
  controllers: (ControllerProps & { col?: ColProps })[];
};
