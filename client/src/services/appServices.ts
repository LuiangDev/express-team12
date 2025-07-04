import { apiClient } from "./api-client";
import type { Payload } from "../components/form/FormGenerateMail";
import type { ProfilePayload } from "../components/form/FormProfile";

export const generateWelcomeEmail = async (
  profileId: string,
  values: Payload
) => {
  try {
    const res = await apiClient.post(
      `/emails/generate/welcome/${profileId}`,
      values
    );
    return res.data;
  } catch (error: unknown) {
    console.error("Error generando correo de bienvenida:", error);
    throw error;
  }
};

export const generatePromotionEmail = async (
  profileId: string,
  values: Payload
) => {
  try {
    const res = await apiClient.post(
      `/emails/generate/promotion/${profileId}`,
      values
    );
    return res.data;
  } catch (error: unknown) {
    console.error("Error generando correo promocional:", error);
    throw error;
  }
};

export const createProfile = async (values: ProfilePayload) => {
  try {
    const res = await apiClient.post("/profile", values);
    return res.data; 
  } catch (error) {
    console.error("Error al crear el perfil:", error);
    throw error;
  }
};



