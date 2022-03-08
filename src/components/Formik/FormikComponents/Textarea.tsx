import React from "react";
import { Textarea as MantineTextarea, TextareaProps } from "@mantine/core";
import { useCustomFormik } from "./Helper";
import { ControlledProps } from "types";

function Textarea(props: ControlledProps & TextareaProps) {
  const { label, name, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);
  const textValue = (formik.values as { [key: string]: any })[name];

  return (
    <MantineTextarea
      label={label}
      name={name}
      error={hasError}
      {...rest}
      value={textValue}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  );
}

export default Textarea;
