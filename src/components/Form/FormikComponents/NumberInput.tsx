import { NumberInput as MantineNumberInput } from "@mantine/core";
import { useCustomFormik } from "./Helper";
import { NumberInputProps } from "types";

function NumberInput(props: NumberInputProps) {
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
