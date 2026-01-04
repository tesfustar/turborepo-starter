"use client";

export const MakePostRequest = async (payload: string) => {
  //eslint-disable-next-line
  const response = await (window as any)?.cbebanksuperapp?.post(payload);
  return response;
};

export const MakeGetRequest = async (payload: string) => {
  //eslint-disable-next-line
  const response = (window as any)?.cbebanksuperapp?.get(payload);
  return response;
};

export const MakePayment = async (payload?: string) => {
  if (payload) {
    //eslint-disable-next-line
    const response = await (window as any)?.cbebanksuperapp?.createPayment(
      payload
    );
    return response;
  } else {
    //eslint-disable-next-line
    const response = await (window as any)?.cbebanksuperapp?.createPayment();
    return response;
  }
};
