import React from "react";
import {
  Checkbox as MantineCheckbox,
  CheckboxProps,
  InputWrapper,
  Group,
  GroupProps,
} from "@mantine/core";
import { OptionsProps, ControlledProps } from "types";
import { useCustomFormik } from "./Helper";
import { Field, FieldProps } from "formik";

function Checkbox(
  props: ControlledProps & CheckboxProps & OptionsProps & GroupProps
) {
  const { label, name, options, direction, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);

  return (
    <InputWrapper id={name} label={label} error={hasError} {...rest}>
      <Field name={name}>
        {(props: FieldProps) => {
          const { field } = props;
          return (
            <Group direction={direction}>
              {options.map((option) => {
                return (
                  <MantineCheckbox
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={name}
                    key={option.label}
                    label={option.label}
                    value={option.value}
                    checked={field.value.includes(option.value)}
                  />
                );
              })}
            </Group>
          );
        }}
      </Field>
    </InputWrapper>
  );
}

export default Checkbox;
