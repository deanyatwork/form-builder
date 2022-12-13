export interface FormConfig {
  title: string;
  description: string;
  fields: FormFields;
}

export interface FormFields {
  [name: string]: {
    type: "choices" | "date" | "text-multi-line";
    label: string;
    value?: string;
    options?: string[];
    validations: Validation[];
  };
}

export type Validation = {
  rule: ValidationRule;
  preCondition?: Precondition;
};

export type ValidationRule = "required" | "dateformat";

export type Precondition = {
  operator: "or" | "and" | "eq" | "not-eq";
  operands?: Precondition[];
  field?: string;
  value?: string;
};
