import React from "react";
import type { TextInputProps } from "@mantine/core";
import { TextInput as MantineTextInput } from "@mantine/core";
import { useCustomFormik } from "./Helper";
import { ControlledProps } from "types";

function TextInput(props: ControlledProps & TextInputProps) {
  const { label, name, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);

  return (
    <>
      <MantineTextInput
        label={label}
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={hasError}
        {...rest}
      />
    </>
  );
}

export default TextInput;
