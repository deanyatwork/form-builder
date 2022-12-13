import { FormEvent } from "react";

const DateField = ({ name, label, value, onChange }: DateFieldProps) => {
  const onValueChange = (e: FormEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    onChange(value);
  };

  return (
    <div className="form-field-group">
      <label htmlFor="date">{label}</label>
      <div>
        <input
          id="date"
          type="date"
          name={name}
          value={value}
          onChange={onValueChange}
        />
      </div>
    </div>
  );
};

interface DateFieldProps {
  name: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

export default DateField;
