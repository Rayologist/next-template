import {
  NumberInput as MantineNumberInput,
  NumberInputProps,
} from "@mantine/core";
import { useCustomFormik } from "./Helper";
import { ControlledProps } from "types";

function NumberInput(props: ControlledProps & NumberInputProps) {
  const { label, name, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);
  const inputValue = formik.values[name] as NumberInputProps["value"];

  return (
    <MantineNumberInput
      label={label}
      name={name}
      value={inputValue ?? undefined}
      onChange={(value) => formik.setFieldValue(name, value)}
      onBlur={formik.handleBlur}
      error={hasError}
      {...rest}
    />
  );
}

export default NumberInput;
