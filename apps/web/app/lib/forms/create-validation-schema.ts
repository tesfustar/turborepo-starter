import * as Yup from "yup";

export const createValidationSchema = (fields: DynamicFormField[]) => {
  const shape: Record<string, Yup.AnySchema> = {};

  fields.forEach((field) => {
    let validator = field.type === "number" ? Yup.number() : Yup.string();

    // if (field.required) {
    validator = validator.required(
      `${field?.field?.replaceAll("_", " ")} is required`
    );
    // }

    if (field.minLength) {
      validator = (validator as Yup.StringSchema).min(
        field.minLength,
        `Minimum ${field.minLength} characters`
      );
    }

    if (field.maxLength) {
      validator = (validator as Yup.StringSchema).max(
        field.maxLength,
        `Maximum ${field.maxLength} characters`
      );
    }

    if (field.pattern) {
      validator = (validator as Yup.StringSchema).matches(
        field.pattern,
        "Invalid format"
      );
    }

    shape[field.field] = validator;
  });

  return Yup.object().shape(shape);
};
