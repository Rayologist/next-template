import React from "react";
import TextInput from "./FormikComponents/TextInput";
import PasswordInput from "./FormikComponents/PasswordInput";
import Select from "./FormikComponents/Select";
import Checkbox from "./FormikComponents/Checkbox";
import RadioGroup from "./FormikComponents/RadioGroup";
import Textarea from "./FormikComponents/Textarea";
import DatePicker from "./FormikComponents/DatePicker";
import { ControllerProps } from "types";

function FormikController(props: ControllerProps) {
  const { control } = props;

  switch (control) {
    case "text-input":
      return <TextInput {...props} />;
    case "password-input":
      return <PasswordInput {...props} />;
    case "select":
      return <Select {...props} />;
    case "checkbox":
      return <Checkbox {...props} />;
    case "radio-group":
      return <RadioGroup {...props} />;
    case "text-area":
      return <Textarea {...props} />;
    case "date-picker":
      return <DatePicker {...props} />;
    default:
      return null;
  }
}

export default React.memo(FormikController);
