 
import { apiClient } from "./api-client";
import type { Payload } from "../components/form/FormGenerateMail";

export const generateMail = async (values: Payload) => {
  try {
    const res = await apiClient.post(`/email/generate`, values);
    return res.data;
  } catch (error: unknown) {
    console.error(error);
  }
};