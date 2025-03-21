import axios from "axios";
import { Apartment } from "../types/apartment";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001/api/v1/apartments";

interface SearchParams {
  name?: string;
  unitNo?: string;
  project?: string;
  page?: number;
  limit?: number;
}

export async function getApartments(params: SearchParams) {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function createApartment(apartmentData: any) {
  try {
    const response = await axios.post(API_URL, apartmentData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export const getApartmentById = async (
  id: string
): Promise<Apartment | undefined> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

function handleApiError(error: any) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      throw new Error(error.response.data.message || "Something went wrong");
    } else if (error.request) {
      throw new Error("No response from server. Please try again.");
    }
  }
  throw new Error("Unexpected error occurred.");
}
