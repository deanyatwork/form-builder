import { FormEvent } from "react";

const OptionsField = ({
  label,
  name,
  value,
  options,
  onChange,
}: OptionsFieldProps) => {
  const onValueChange = (e: FormEvent<HTMLSelectElement>): void => {
    onChange(e.currentTarget.value);
  };
  return (
    <div className="form-field-group">
      <label htmlFor="select">{label}</label>
      <div>
        <select id="select" name={name} value={value} onChange={onValueChange}>
          <option value="">Select an option</option>
          {options.map((choice) => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

interface OptionsFieldProps {
  label: string;
  name: string;
  value?: string;
  options: string[];
  onChange: (value: string) => void;
}

export default OptionsField;
