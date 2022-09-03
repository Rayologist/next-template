import React from 'react';
import { ControllerProps } from 'types';
import TextInput from './FormikComponents/TextInput';
import PasswordInput from './FormikComponents/PasswordInput';
import Select from './FormikComponents/Select';
import CheckboxGroup from './FormikComponents/CheckboxGroup';
import RadioGroup from './FormikComponents/RadioGroup';
import Textarea from './FormikComponents/Textarea';
import DatePicker from './FormikComponents/DatePicker';
import NumberInput from './FormikComponents/NumberInput';
import MultiSelect from './FormikComponents/MultiSelect';
import FileInput from './FormikComponents/FileInput';

function FormikController(props: ControllerProps) {
  const { control } = props;

  switch (control) {
    case 'text-input':
      return <TextInput {...props} />;
    case 'password-input':
      return <PasswordInput {...props} />;
    case 'number-input':
      return <NumberInput {...props} />;
    case 'select':
      return <Select {...props} />;
    case 'checkbox-group':
      return <CheckboxGroup {...props} />;
    case 'radio-group':
      return <RadioGroup {...props} />;
    case 'text-area':
      return <Textarea {...props} />;
    case 'date-picker':
      return <DatePicker {...props} />;
    case 'multi-select':
      return <MultiSelect {...props} />;
    case 'file-input':
      return <FileInput {...props} />;
    default:
      return null;
  }
}

export default React.memo(FormikController);
