import { Dispatch, SetStateAction, ReactNode } from 'react';
import {
  PasswordInputProps as MantinePasswordInputProps,
  RadioGroupProps as MantineRadioGroupProps,
  RadioProps,
  SelectProps as MantineSelectProps,
  TextareaProps as MantineTextareaProps,
  TextInputProps as MantineTextInputProps,
  CheckboxGroupProps as MantineCheckboxGroupProps,
  CheckboxProps,
  NumberInputProps as MantineNumberInputProps,
  MultiSelectProps as MantineMultiSelectProps,
  FileInputProps as MantineFileInputProps,
  SwitchGroupProps as MantineSwitchGroupProps,
  SwitchProps,
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
import { FieldValues, UseFormReturn } from 'react-hook-form';

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
      selectData: (
        facetedUniqueValue: Map<any, number>,
        facetedMinMaxValue: undefined | [number, number]
      ) => { label: string; value: any }[];
    }
  | {
      type: 'date';
      props?: Partial<DateRangePickerFilter>;
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

// ------React-Hook-Form-Controlled Mantine Component types------
export type Option<OtherProps = {}> = {
  label: ReactNode;
  value: any;
} & OtherProps;

export interface Options<OtherProps = {}> {
  options: Option<OtherProps>[];
}

export type Controlled<T> = { label: ReactNode; name: string } & T;

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
export type MultiSelectProps = Controlled<
  Omit<MantineMultiSelectProps, 'data'> & {
    options: MantineMultiSelectProps['data'];
  }
>;
export type CheckboxGroupProps = Controlled<
  Omit<MantineCheckboxGroupProps, 'children'> & Options<CheckboxProps>
>;
export type RadioGroupProps = Controlled<
  Omit<MantineRadioGroupProps, 'children'> & Options<RadioProps>
>;
export type SwitchGroupProps = Controlled<
  Omit<MantineSwitchGroupProps, 'children'> & Options<SwitchProps>
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
  | ({ control: 'file-input' } & FileInputProps<boolean>)
  | ({ control: 'switch-group' } & SwitchGroupProps);

export type Controllers<TFieldValues extends FieldValues, TContext> = {
  [key in keyof TFieldValues]: ControllerProps & { name: key } & {
    col?: ColProps;
    after?: ReactNode | ((ctx: UseFormReturn<TFieldValues, TContext>) => ReactNode);
  };
};

export type FormControllerProps<TFieldValues extends FieldValues = FieldValues, TContext = any> = {
  controllers:
    | Controllers<TFieldValues, TContext>
    | ((context: UseFormReturn<TFieldValues, TContext>) => Controllers<TFieldValues, TContext>);
};
