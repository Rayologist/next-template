import React from "react";
import {
  PasswordInput as MantinePasswordInput,
  PasswordInputProps,
} from "@mantine/core";
import { useCustomFormik } from "./Helper";
import { ControlledProps } from "types";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons";

function PasswordInput(props: ControlledProps & PasswordInputProps) {
  const { label, name, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);
  return (
    <MantinePasswordInput
      name={name}
      label={label}
      error={hasError}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      visibilityToggleIcon={({ reveal, size }) =>
        reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
      }
      {...rest}
    />
  );
}

export default PasswordInput;
