import { DatePicker as MantineDatePicker } from "@mantine/dates";
import { useCustomFormik } from "./Helper";
import { DatePickerProps } from "types";

function DatePicker(props: DatePickerProps) {
  const { label, name, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);
  const dateValue = formik.values[name] as DatePickerProps["value"];

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
