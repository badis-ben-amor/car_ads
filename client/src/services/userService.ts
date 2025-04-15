import axios from "axios";

export const getUser = (accessToken: string) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
