import { Dispatch, SetStateAction, ReactNode } from 'react';
import {
  CheckboxGroupProps as MantineCheckboxGroupProps,
  CheckboxProps,
  ColProps,
  FileInputProps as MantineFileInputProps,
  GroupProps,
  InputWrapperBaseProps,
  MultiSelectProps as MantineMultiSelectProps,
  NumberInputProps as MantineNumberInputProps,
  PasswordInputProps as MantinePasswordInputProps,
  PinInputProps as MantinePinInputProps,
  RadioGroupProps as MantineRadioGroupProps,
  RadioProps,
  SelectProps as MantineSelectProps,
  StackProps,
  SwitchGroupProps as MantineSwitchGroupProps,
  SwitchProps,
  TextInputProps as MantineTextInputProps,
  TextareaProps as MantineTextareaProps,
} from '@mantine/core';
import {
  DateInputProps as MantineDateInputProps,
  DatePickerInputProps as MantineDatePickerInputProps,
  DatePickerValue,
  DatePickerType,
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

// ------React-Hook-Form-Controlled Mantine Component types------
export type Option<OtherProps = {}> = {
  label: ReactNode;
  value: any;
} & OtherProps;

export interface Options<OtherProps = {}> {
  options: Option<OtherProps>[];
}

export type Controlled<T> = { label: ReactNode; name: string } & T;
export type Orientation =
  | { orientation?: 'horizontal'; orientationProps?: GroupProps }
  | { orientation?: 'vertical'; orientationProps?: StackProps };
export type TextInputProps = Controlled<MantineTextInputProps>;
export type PasswordInputProps = Controlled<MantinePasswordInputProps>;
export type TextareaProps = Controlled<MantineTextareaProps>;
export type NumberInputProps = Controlled<MantineNumberInputProps>;
export type DateInputProps = Controlled<MantineDateInputProps>;
export type PinInputProps = Controlled<MantinePinInputProps> & InputWrapperBaseProps;
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
  Omit<MantineCheckboxGroupProps, 'children'> & Options<CheckboxProps> & Orientation
>;
export type RadioGroupProps = Controlled<
  Omit<MantineRadioGroupProps, 'children'> & Options<RadioProps> & Orientation
>;
export type SwitchGroupProps = Controlled<
  Omit<MantineSwitchGroupProps, 'children'> & Options<SwitchProps> & Orientation
>;

export type ControllerProps =
  | ({ control: 'checkbox-group' } & CheckboxGroupProps)
  | ({ control: 'date-input' } & DateInputProps)
  | ({ control: 'file-input' } & FileInputProps<boolean>)
  | ({ control: 'multi-select' } & MultiSelectProps)
  | ({ control: 'number-input' } & NumberInputProps)
  | ({ control: 'password-input' } & PasswordInputProps)
  | ({ control: 'pin-input' } & PinInputProps)
  | ({ control: 'radio-group' } & RadioGroupProps)
  | ({ control: 'select' } & SelectProps)
  | ({ control: 'switch-group' } & SwitchGroupProps)
  | ({ control: 'text-area' } & TextareaProps)
  | ({ control: 'text-input' } & TextInputProps);

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
