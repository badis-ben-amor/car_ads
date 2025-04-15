import { CarType } from "@/types/carType";
import axios from "axios";

export const getAllCars = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/car`);
  return res;
};

export function createCar(accessToken: string, formData: FormData) {
  return axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/car`, formData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function updateCar(
  accessToken: string,
  carId: string,
  formData: FormData
) {
  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_KEY}/car/${carId}`,
    formData,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}

export function deleteCar(accessToken: string, carId: string) {
  return axios.delete(`${process.env.NEXT_PUBLIC_API_KEY}/car/${carId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
