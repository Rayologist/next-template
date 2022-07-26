import React from "react";
import {
  DatePicker as MantineDatePicker,
  DatePickerProps,
} from "@mantine/dates";
import { useCustomFormik } from "./Helper";
import { ControlledProps } from "types";

function DatePicker(props: ControlledProps & DatePickerProps) {
  const { label, name, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);
  const dateValue = (formik.values as { [key: string]: any })[name];

  return (
    <MantineDatePicker
      label={label}
      value={dateValue}
      error={hasError}
      {...rest}
      onChange={(value) => formik.setFieldValue(name, value)}
      onBlur={() => formik.setFieldTouched(name, true)}
    />
  );
}

export default DatePicker;
