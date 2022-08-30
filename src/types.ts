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
} from "@mantine/core";
import { DatePickerProps as MantineDatePickerProps } from "@mantine/dates";

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
export type FileInputProps<T extends boolean> = Controlled<
  MantineFileInputProps<T>
>;
export type SelectProps = Controlled<
  Omit<MantineSelectProps, "data"> & {
    options: MantineSelectProps["data"];
  }
>;
export type CheckboxGroupProps = Controlled<
  Omit<MantineCheckboxGroupProps, "children"> & Options
>;
export type RadioGroupProps = Controlled<
  Omit<MantineRadioGroupProps, "children"> & Options
>;
export type MultiSelectProps = Controlled<
  Omit<MantineMultiSelectProps, "data"> & {
    options: MantineMultiSelectProps["data"];
  }
>;

export type ControllerProps =
  | ({ control: "text-input" } & TextInputProps)
  | ({ control: "password-input" } & PasswordInputProps)
  | ({ control: "select" } & SelectProps)
  | ({ control: "checkbox-group" } & CheckboxGroupProps)
  | ({ control: "radio-group" } & RadioGroupProps)
  | ({ control: "text-area" } & TextareaProps)
  | ({ control: "date-picker" } & DatePickerProps)
  | ({ control: "number-input" } & NumberInputProps)
  | ({ control: "multi-select" } & MultiSelectProps)
  | ({ control: "file-input" } & FileInputProps<boolean>);
