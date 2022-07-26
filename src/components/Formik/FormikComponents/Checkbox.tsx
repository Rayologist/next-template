import React, { useState } from "react";
import {
  Checkbox as MantineCheckbox,
  CheckboxProps,
  CheckboxGroupProps,
} from "@mantine/core";
import { OptionsProps, ControlledProps } from "types";
import { useCustomFormik } from "./Helper";

function Checkbox(
  props: ControlledProps &
    CheckboxProps &
    OptionsProps &
    Omit<CheckboxGroupProps, "children">
) {
  const { label, name, options, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);
  const checkboxValue = (formik.values as { [key: string]: any })[name];

  return (
    <MantineCheckbox.Group
      label={label}
      value={checkboxValue}
      onChange={(value) => {
        formik.setFieldValue(name, value);
      }}
      onBlur={() => formik.setFieldTouched(name, true)}
      error={hasError}
      {...rest}
    >
      {options.map((option, index) => {
        return (
          <MantineCheckbox
            key={`${option.label}-${index}`}
            label={option.label}
            value={option.value}
          />
        );
      })}
    </MantineCheckbox.Group>
  );
}

export default Checkbox;
