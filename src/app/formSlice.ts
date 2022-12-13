import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormFields, Validation } from "../types/FormConfig";
import { validate } from "../utils/validator";
import { RootState } from "./store";

export interface FormState {
  [name: string]: {
    label: string;
    value?: string;
    isValid: boolean;
    validations: Validation[];
  };
}

const initialState: FormState = {};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<FormFields>) => {
      const config = action.payload;
      Object.keys(config).forEach((key) => {
        state[key] = {
          label: config[key].label,
          value: config[key].value,
          isValid: false,
          validations: config[key].validations,
        };
      });
      validateForm(state);
    },
    setValue: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      const { name, value } = action.payload;
      state[name].value = value;
      validateForm(state);
    },
    logForm: (state) => {
      const body = Object.values(state).map(
        (field) => `<p>${field.label}<br>${field.value ?? "N/A"}</p>`
      );
      const html = `<html><body>${body.join("")}</body></html>`;
      console.log(html);
    },
  },
});

const validateForm = (state: FormState) => {
  Object.keys(state).forEach((name) => {
    state[name].isValid = validate(
      state[name].value,
      state[name].validations,
      state
    );
  });
};

export const { setValue, setForm, logForm } = formSlice.actions;

export const selectValue = (name: string) => (state: RootState) =>
  state.form[name]?.value;

export const selectFormValid = (state: RootState) => {
  const invalidField = Object.values(state.form).find(
    (x) => x.isValid === false
  );
  return !invalidField;
};

export default formSlice.reducer;
