import {
  CheckboxProps,
  PasswordInputProps,
  RadioGroupProps,
  SelectProps,
  TextareaProps,
  TextInputProps,
  CheckboxGroupProps,
  NumberInputProps,
} from "@mantine/core";
import { DatePickerProps } from "@mantine/dates";

export type OptionType = {
  label: string;
  value: any;
};

export type ControlledProps = { label: string; name: string };

export type ControllerProps = ControlledProps &
  (
    | ({ control: "text-input" } & TextInputProps)
    | ({ control: "password-input" } & PasswordInputProps)
    | ({ control: "select"; options: OptionType[] } & Omit<SelectProps, "data">)
    | ({ control: "checkbox"; options: OptionType[] } & CheckboxProps &
        Omit<CheckboxGroupProps, "children">)
    | ({ control: "radio-group"; options: OptionType[] } & Omit<
        RadioGroupProps,
        "children"
      >)
    | ({ control: "text-area" } & TextareaProps)
    | ({ control: "date-picker" } & DatePickerProps)
    | ({ control: "number-input" } & NumberInputProps)
  );

export interface OptionsProps {
  options: OptionType[];
}
