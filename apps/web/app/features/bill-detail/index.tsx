"use client";

import BillAmount from "@/app/components/BillAmount";
import Button from "@/app/components/ui/Button";
import Text from "@/app/components/ui/Text";
import TextInput from "@/app/components/ui/TextInput";
import UtilityMiniInfo from "@/app/components/UtilityMiniInfo";
import { createValidationSchema } from "@/app/lib/forms/create-validation-schema";
import { defineInitialValues } from "@/app/lib/forms/define-initial-values";
import { MakePayment, MakePostRequest } from "@/app/lib/hooks/make-api-calls";
import { useQueryData } from "@/app/store/query-data.store";
import { useTheme } from "@/app/store/theme.store";
import { themeColors } from "@/app/theme/themeColors";
import { ErrorMessage, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const BillDetail = () => {
  const router = useRouter();
  const {
    queryData: data,
    overrideForm,
    nextStep,
    setQueryData,
    setOverrideForm,
    setNextStep,
    setSuccessPayload,
  } = useQueryData((state) => state);

  const { activeTheme } = useTheme();
  const theme = themeColors[activeTheme];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formFields: DynamicFormField[] = overrideForm
    ? overrideForm?.overridden_request_body
    : null;

  //eslint-disable-next-line
  const renderValue = (value: any) => {
    if (typeof value === "string" || typeof value === "number") {
      return <div className="text-lg font-medium">{String(value)}</div>;
    }
    return null;
  };

  const handleContinue = async (
    //eslint-disable-next-line
    values: Record<string, any>
  ) => {
    try {
      const request_payload: string = JSON.stringify(values);

      if (nextStep === "PAYMENT") {
        const getPaymentResponse = await MakePayment(request_payload);

        if (getPaymentResponse?.data?.success) {
          toast.success("Payment Successful!");
          setSuccessPayload(getPaymentResponse?.data);
          router.push("/payment-success");
        } else {
          toast.error(getPaymentResponse?.data?.message);
        }
      } else {
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
          } else if (
            getBillDetail?.data?.to_be_overridden?.overridden_request_body &&
            !getBillDetail?.data?.UtilityData
          ) {
            setOverrideForm(getBillDetail?.data?.to_be_overridden);
          } else {
            throw getBillDetail;
          }
        }
      } //eslint-disable-next-line
    } catch (error: any) {
      const errorData = JSON.parse(error?.error);
      toast.error(errorData?.error?.message ?? "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMakePayment = async () => {
    try {
      const getPaymentResponse = await MakePayment();

      if (getPaymentResponse?.data?.success) {
        setSuccessPayload(getPaymentResponse?.data);
      } else {
        toast.error(getPaymentResponse?.data?.message);
      }
      //eslint-disable-next-line
    } catch (error: any) {
      const errorData = JSON.parse(error?.error);
      toast.error(errorData?.error?.message ?? "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (typeof data === "string" || typeof data === "number") {
    return <div className="flex flex-col gap-2">{renderValue(data)}</div>;
  } else if (data === null) {
    return <div>No data found</div>;
  }

  return (
    <div className=" xs:w-full  md:w-1/2 lg:w-1/3 bg-transparent  relative flex flex-col justify-between p-4">
      {formFields ? (
        <Formik
          initialValues={defineInitialValues(formFields)}
          validationSchema={createValidationSchema(formFields)}
          //eslint-disable-next-line
          onSubmit={(values: Record<string, any>) => handleContinue(values)}
        >
          {({ errors, touched, isValid }) => {
            return (
              <Form className="flex flex-col gap-4  min-h-[96dvh] justify-between relative ">
                <div>
                  <UtilityMiniInfo />

                  <Text className="text-md font-semibold text-left ">
                    Bill Detail
                  </Text>

                  <BillAmount total_amount={data?.total_amount} />

                  <div className="p-2 rounded-3xl shadow-sm">
                    {data?.bill_reference_number ? (
                      <div className="flex justify-between items-center text-sm">
                        <Text className="">Bill Reference Number</Text>
                        <Text className="font-medium">
                          {data?.bill_reference_number}
                        </Text>
                      </div>
                    ) : null}

                    {data?.full_name ? (
                      <div className="flex justify-between items-center text-sm">
                        <Text className="">Full Name</Text>
                        <Text className="font-medium">{data?.full_name}</Text>
                      </div>
                    ) : null}

                    {data?.total_amount ? (
                      <div className="flex justify-between items-center text-sm">
                        <Text className="">Total Amount</Text>
                        <Text className="font-medium">
                          {data?.total_amount}
                        </Text>
                      </div>
                    ) : null}
                  </div>

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
                </div>

                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  isLoading={isSubmitting}
                >
                  Continue
                </Button>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <div className="flex flex-col gap-4  min-h-[96dvh] justify-between relative">
          <div>
            <UtilityMiniInfo />

            <Text className="text-md font-semibold text-left ">
              Bill Detail
            </Text>
            <BillAmount total_amount={data?.total_amount} />
            <div className="p-2 rounded-3xl shadow-sm">
              {data?.bill_reference_number ? (
                <div className="flex justify-between items-center text-sm">
                  <Text className="">Bill Reference Number</Text>
                  <Text className="font-medium">
                    {data?.bill_reference_number}
                  </Text>
                </div>
              ) : null}

              {data?.full_name ? (
                <div className="flex justify-between items-center text-sm">
                  <Text className="">Full Name</Text>
                  <Text className="font-medium">{data?.full_name}</Text>
                </div>
              ) : null}

              {data?.total_amount ? (
                <div className="flex justify-between items-center text-sm">
                  <Text className="">Total Amount</Text>
                  <Text className="font-medium">{data?.total_amount}</Text>
                </div>
              ) : null}
            </div>
          </div>

          <Button
            type="button"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            onClick={() => handleMakePayment()}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default BillDetail;
