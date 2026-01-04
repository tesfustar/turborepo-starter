interface DynamicFormField {
  field: string;
  label?: string;
  type?: "text" | "number";
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}
