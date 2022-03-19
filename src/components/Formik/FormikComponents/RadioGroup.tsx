import React from "react";
import {
  Radio,
  RadioGroupProps,
  RadioGroup as MantineRadioGroup,
} from "@mantine/core";
import { useCustomFormik } from "./Helper";
import { ControlledProps } from "types";
import { OptionsProps } from "types";

function RadioGroup(
  props: ControlledProps & OptionsProps & Omit<RadioGroupProps, "children">
) {
  const { label, name, options, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);

  return (
    <MantineRadioGroup
      label={label}
      name={name}
      error={hasError}
      onChange={(value) => {
        formik.setFieldValue(name, value);
      }}
      {...rest}
    >
      {options.map((option, index) => {
        return (
          <Radio
            key={`${option.label}-${index}`}
            value={option.value}
            label={option.label}
          />
        );
      })}
    </MantineRadioGroup>
  );
}

export default RadioGroup;
