import React from "react";
import { useCustomFormik } from "./Helper";
import { Select as MantineSelect, SelectProps } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { OptionsProps, ControlledProps } from "types";

function Select(
  props: ControlledProps & OptionsProps & Omit<SelectProps, "data">
) {
  const { label, options, name, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);
  const fieldValue = (formik.values as { [key: string]: any })[name];

  return (
    <MantineSelect
      rightSection={<IconChevronDown width={15} color="#9e9e9e" />}
      styles={{ rightSection: { pointerEvents: "none" } }}
      label={label}
      name={name}
      value={fieldValue}
      onChange={(value) => formik.setFieldValue(name, value)}
      onBlur={() => formik.setFieldTouched(name, true)}
      allowDeselect
      error={hasError}
      {...rest}
      data={options}
    />
  );
}

export default Select;
