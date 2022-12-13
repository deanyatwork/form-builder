import { Validation, ValidationRule, Precondition } from "../types/FormConfig";

type FormData = {
  [name: string]: {
    value?: string;
  };
};

export const validate = (
  value: string | undefined,
  validations: Validation[],
  data: FormData
): boolean => {
  for (const validation of validations) {
    if (
      !validation.preCondition ||
      isPreconditionSatisfied(validation.preCondition, data)
    ) {
      if (!validateValueByRules(value, validation.rule)) {
        return false;
      }
    }
  }

  return true;
};

const validateValueByRules = (
  value: string | undefined,
  rule: ValidationRule
): boolean => {
  switch (rule) {
    case "required":
      return !!value?.trim();
    case "dateformat":
      // TODO implement a validation for date format, could use a configurable regex field to validate any format
      return true;
  }
};

const isPreconditionSatisfied = (
  precondition: Precondition,
  data: FormData
): boolean => {
  let result = false;
  switch (precondition.operator) {
    case "or":
      precondition.operands?.forEach((o) => {
        result = result || isPreconditionSatisfied(o, data);
      });
      break;
    case "and":
      precondition.operands?.forEach((o) => {
        result = result && isPreconditionSatisfied(o, data);
      });
      break;
    case "eq":
      result = data[precondition.field as string].value === precondition.value;
      break;
    case "not-eq":
      result = data[precondition.field as string].value !== precondition.value;
      break;
  }

  return result;
};
