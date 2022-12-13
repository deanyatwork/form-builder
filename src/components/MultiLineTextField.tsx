import { FormEvent } from "react";

const MultiLineTextField = ({
  name,
  label,
  value,
  onChange,
}: MultiLineTextFieldProps) => {
  const onValueChange = (e: FormEvent<HTMLTextAreaElement>): void => {
    console.log("changed");
    onChange(e.currentTarget.value);
  };
  return (
    <div className="form-field-group">
      <label htmlFor="textarea">{label}</label>
      <div>
        <textarea
          id="textarea"
          name={name}
          value={value}
          rows={10}
          onChange={onValueChange}
        />
      </div>
    </div>
  );
};

interface MultiLineTextFieldProps {
  name: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

export default MultiLineTextField;
