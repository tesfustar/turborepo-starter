export const defineInitialValues = (fields: DynamicFormField[]) => {
  //eslint-disable-next-line
  return fields.reduce<Record<string, any>>((acc, field) => {
    acc[field.field] = "";
    return acc;
  }, {});
};
