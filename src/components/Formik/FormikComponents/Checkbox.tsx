import React, { useState } from "react";
import {
  Checkbox as MantineCheckbox,
  CheckboxProps,
  CheckboxGroupProps,
  // InputWrapper,
  // Group,
  // GroupProps,
} from "@mantine/core";
import { OptionsProps, ControlledProps } from "types";
import { useCustomFormik } from "./Helper";

// function LegacyCheckbox(
//   props: ControlledProps & CheckboxProps & OptionsProps & GroupProps
// ) {
//   const { label, name, options, direction, ...rest } = props;
//   const [formik, hasError] = useCustomFormik(name);

//   return (
//     <InputWrapper id={name} label={label} error={hasError} {...rest}>
//       <Field name={name}>
//         {(props: FieldProps) => {
//           const { field } = props;
//           return (
//             <MantineCheckbox direction={direction}>
//               {options.map((option) => {
//                 return (
//                   <MantineCheckbox
//                     onChange={field.onChange}
//                     onBlur={field.onBlur}
//                     name={name}
//                     key={option.label}
//                     label={option.label}
//                     value={option.value}
//                     checked={field.value.includes(option.value)}
//                   />
//                 );
//               })}
//             </MantineCheckbox>
//           );
//         }}
//       </Field>
//     </InputWrapper>


function Checkbox(
  props: ControlledProps & CheckboxProps & OptionsProps & CheckboxGroupProps
) {
  const { label, name, options, ...rest } = props;
  const [formik, hasError] = useCustomFormik(name);
  const checkboxValue = (formik.values as { [key: string]: any })[name];

  return (
    <MantineCheckbox.Group
      label={label}
      value={checkboxValue}
      onChange={(value) => {
        formik.setFieldValue(name, value);
      }}
      onBlur={() => formik.setFieldTouched(name, true)}
      error={hasError}
      {...rest}
    >
      {options.map((option, index) => {
        return (
          <MantineCheckbox
            key={`${option.label}-${index}`}
            label={option.label}
            value={option.value}
          />
        );
      })}
    </MantineCheckbox.Group>
  );
}

export default Checkbox;
