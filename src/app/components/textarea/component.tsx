import { ChangeEvent, useCallback, useEffect, useId, useRef } from 'react';

import { Field, FieldProps } from '../field';

interface TextAreaProps extends FieldProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const TextArea = ({ placeholder, value, onChange, ...props }: TextAreaProps) => {
  const id = useId();
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = '0px';
      const scrollHeight = ref.current.scrollHeight + 12;
      const maxHeight = 160;
      const height = scrollHeight > maxHeight ? maxHeight : scrollHeight;
      ref.current.style.height = height + 'px';
    }
  }, [ref, value]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <Field {...props}>
      <textarea
        id={id}
        ref={ref}
        className="w-full border rounded p-2 border-gray-500 resize-none"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </Field>
  );
};
