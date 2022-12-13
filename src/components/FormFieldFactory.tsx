import { selectValue, setValue } from "../app/formSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import DateField from "./DateField";
import MultiLineTextField from "./MultiLineTextField";
import OptionsField from "./OptionsField";

const FormFieldFactory = (props: FormFieldFactoryProps) => {
  const dispatch = useAppDispatch();
  const onChange = (value: string) =>
    dispatch(setValue({ name: props.name, value }));
  const value = useAppSelector(selectValue(props.name));

  switch (props.type) {
    case "choices":
      return (
        <OptionsField
          name={props.name}
          label={props.label}
          options={props.options as string[]}
          value={value}
          onChange={onChange}
        />
      );
    case "date":
      return (
        <DateField
          name={props.name}
          label={props.label}
          value={value}
          onChange={onChange}
        />
      );
    case "text-multi-line":
      return (
        <MultiLineTextField
          name={props.name}
          label={props.label}
          value={value}
          onChange={onChange}
        />
      );
  }
};

interface FormFieldFactoryProps {
  type: "choices" | "date" | "text-multi-line";
  name: string;
  label: string;
  options?: string[];
}

export default FormFieldFactory;
