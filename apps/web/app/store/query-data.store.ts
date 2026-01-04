import { create } from "zustand";

type QueryDataProps = {
  //eslint-disable-next-line
  utilityData: any;
  //eslint-disable-next-line
  queryData: any | null; //eslint-disable-next-line
  overrideForm: any | null;
  currentStep: string;
  nextStep: string; //eslint-disable-next-line
  successPayload: any;

  //eslint-disable-next-line
  setUtilityData: (data: any) => void;
  //eslint-disable-next-line
  setQueryData: (data: any) => void;
  //eslint-disable-next-line
  setOverrideForm: (data: any) => void;
  setCurrentStep: (step: string) => void;
  setNextStep: (step: string) => void;
  //eslint-disable-next-line
  setSuccessPayload: (payload: any) => void;
};

export const useQueryData = create<QueryDataProps>((set) => ({
  utilityData: null,
  queryData: null,
  overrideForm: null,
  currentStep: "",
  nextStep: "",
  successPayload: null,

  //eslint-disable-next-line
  setUtilityData: async (data: any) => set({ utilityData: data }),
  //eslint-disable-next-line
  setQueryData: async (data: any) => set({ queryData: data }),
  //eslint-disable-next-line
  setOverrideForm: async (data: any) => set({ overrideForm: data }),
  setCurrentStep: async (step: string) => set({ currentStep: step }),
  setNextStep: async (step: string) => set({ nextStep: step }),
  //eslint-disable-next-line
  setSuccessPayload: async (payload: any) => set({ successPayload: payload }),
}));
