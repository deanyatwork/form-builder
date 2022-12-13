import { useEffect, useMemo } from "react";
import { logForm, selectFormValid, setForm } from "../app/formSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FormConfig } from "../types/FormConfig";
import FormFieldFactory from "./FormFieldFactory";
import styles from "./FormBuilder.module.css";

// Assuming configJson is from the server, which has an unknow type.
const FormBuilder = ({ configJson }: { configJson: unknown }) => {
  const dispatch = useAppDispatch();

  // TODO: sanitise the data here.
  const config = configJson as FormConfig;

  useEffect(() => {
    dispatch(setForm(config.fields));
  }, [dispatch, config]);

  const isFormValid = useAppSelector(selectFormValid);

  const formFields = useMemo(
    () =>
      Object.entries(config.fields).map(
        ([key, { type, label, validations, ...other }]) => (
          <FormFieldFactory
            key={key}
            name={key}
            type={type}
            label={label}
            {...other}
          />
        )
      ),
    [config]
  );

  const submitForm = () => dispatch(logForm());

  return (
    <form className={styles.main}>
      <h1>{config.title}</h1>
      <p>{config.description}</p>
      {formFields}
      <button type="button" disabled={!isFormValid} onClick={submitForm}>
        Submit
      </button>
    </form>
  );
};

export default FormBuilder;
