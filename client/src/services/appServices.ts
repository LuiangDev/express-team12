import { apiClient } from "./api-client";

export const generateMail = async (values: {
  type: string;
  tone: string;
  length: string;
  message: string;
}) => {
  try {
    const res = await apiClient.post(`/email/generate`, values);
    return res.data;
  } catch (error: unknown) {
    console.error(error);
  }
};
