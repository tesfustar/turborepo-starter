"use client";

import Button from "@/app/components/ui/Button";
import Text from "@/app/components/ui/Text";
import TextInput from "@/app/components/ui/TextInput";
import UtilityMiniInfo from "@/app/components/UtilityMiniInfo";
import { createValidationSchema } from "@/app/lib/forms/create-validation-schema";
import { defineInitialValues } from "@/app/lib/forms/define-initial-values";
import { MakePostRequest } from "@/app/lib/hooks/make-api-calls";
import { useQueryData } from "@/app/store/query-data.store";
import { useTheme } from "@/app/store/theme.store";
import { themeColors } from "@/app/theme/themeColors";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

//GUZOGO DEPLOYMENT
const UtilityForm: React.FC = () => {
  const { activeTheme } = useTheme();
  const theme = themeColors[activeTheme];

  const router = useRouter();
  const {
    utilityData: utilityInfo,
    setUtilityData,
    setQueryData,
    setOverrideForm,
    setNextStep,
  } = useQueryData((state) => state);

  const handleFormSubmission = async (
    //eslint-disable-next-line
    values: Record<string, any>, //eslint-disable-next-line
    helpers: FormikHelpers<Record<string, any>>
  ) => {
    const { setSubmitting } = helpers;
    try {
      const request_payload: string = JSON.stringify(values);
      const getBillDetail = await MakePostRequest(request_payload);

      if (getBillDetail?.data) {
        if (getBillDetail?.data?.next_step) {
          setNextStep(getBillDetail?.data?.next_step);
        }
        if (getBillDetail?.data?.UtilityData) {
          setQueryData(getBillDetail?.data?.UtilityData);

          if (getBillDetail?.data?.to_be_overridden) {
            setOverrideForm(getBillDetail?.data?.to_be_overridden);
          } else {
            setOverrideForm(null);
          }
          if (typeof window !== "undefined") {
            router.push("/bill-detail");
          }
        } else if (
          getBillDetail?.data?.to_be_overridden?.overridden_request_body &&
          !getBillDetail?.data?.UtilityData
        ) {
          setUtilityData(getBillDetail?.data);
        } else {
          throw getBillDetail;
        }
      } else {
        throw getBillDetail;
      } //eslint-disable-next-line
    } catch (error: any) {
      let message = "Something went wrong!";

      try {
        if (typeof error?.error === "string") {
          const parsed = JSON.parse(error.error);
          message = parsed?.error?.message ?? message;
        } else if (error?.message) {
          message = error.message;
        }
      } catch {
        // swallow JSON parse errors safely
      }

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const formFields: DynamicFormField[] = useMemo(() => {
    return utilityInfo?.to_be_overridden?.overridden_request_body;
  }, [utilityInfo]);

  return (
    <div className="flex items-center justify-center px-4 w-full bg-transparent ">
      <div className="w-full  md:w-1/2 lg:w-1/3  relative space-y-4">
        <UtilityMiniInfo />

        {formFields ? (
          <Formik
            initialValues={defineInitialValues(formFields)}
            validationSchema={createValidationSchema(formFields)}
            //eslint-disable-next-line
            onSubmit={(values: Record<string, any>, helpers) =>
              handleFormSubmission(values, helpers)
            }
          >
            {({ errors, touched, isValid, isSubmitting }) => {
              return (
                <Form className="flex flex-col gap-4 justify-between relative">
                  <div>
                    {formFields?.map((field) => {
                      const hasError = Boolean(
                        touched[field.field as keyof typeof touched] &&
                        errors[field.field as keyof typeof errors]
                      );

                      return (
                        <div
                          key={field.field}
                          className="flex flex-col gap-2 mt-2"
                        >
                          <Text className="block text-md font-medium">
                            {field.label ?? field.field.replaceAll("_", " ")}
                          </Text>
                          <TextInput
                            name={field.field}
                            type={field.type ?? "text"}
                            placeholder={`Enter ${field.field.replaceAll(
                              "_",
                              " "
                            )}`}
                            className={`w-full bg-transparent capitalize px-4 py-3 border rounded-xl`}
                            hasError={hasError}
                          />

                          {hasError ? (
                            <ErrorMessage
                              name={field.field}
                              render={(msg: string) => (
                                <div
                                  className="text-sm"
                                  style={{ color: theme.state.error }}
                                >
                                  {msg}
                                </div>
                              )}
                            />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>

                  <div className="fixed bottom-1 left-0 w-full px-4">
                    <Button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      isLoading={isSubmitting}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        ) : (
          <div>
            <Text>No Form fields found</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default UtilityForm;
