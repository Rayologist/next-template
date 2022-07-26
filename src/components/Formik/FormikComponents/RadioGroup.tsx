import React from "react";
import { Radio, RadioGroupProps } from "@mantine/core";
import { useCustomFormik } from "./Helper";
import { ControlledProps } from "types";
import { OptionsProps } from "types";

function RadioGroup(
  props: ControlledProps & OptionsProps & Omit<RadioGroupProps, "children">
) {
  const { label, name, options, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);
  const radioValue = (formik.values as { [key: string]: any })[name];

  return (
    <Radio.Group
      label={label}
      value={radioValue}
      error={hasError}
      onChange={(value) => {
        formik.setFieldValue(name, value);
      }}
      onBlur={() => formik.setFieldTouched(name, true)}
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
    </Radio.Group>
  );
}

export default RadioGroup;
