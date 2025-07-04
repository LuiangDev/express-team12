import { apiClient } from "./api-client";
import type { Payload } from "../components/form/FormGenerateMail";
import type { ProfilePayload } from "../components/form/FormProfile";

export const generateMail = async (values: Payload) => {
  try {
    const res = await apiClient.post(`/email/generate`, values);
    return res.data;
  } catch (error: unknown) {
    console.error(error);
  }
};

export const createProfile = async (values: ProfilePayload) => {
  try {
    await apiClient.post("/profile", values);
  } catch (error: unknown) {
    console.error("Error al crear el perfil:", error);
    throw error;
  }
};
