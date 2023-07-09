import { ChangeEvent, useCallback, useId } from 'react';

import { Field, FieldProps } from '../field';

interface InputProps extends FieldProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const Input = ({ placeholder, value, onChange, ...props }: InputProps) => {
  const id = useId();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <Field {...props}>
      <input
        id={id}
        className="w-full border rounded p-2 border-gray-500"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </Field>
  );
};
