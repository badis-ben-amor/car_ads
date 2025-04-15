import axios from "axios";

export const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_KEY}/register`,
    {
      name,
      email,
      password,
    },
    { withCredentials: true }
  );
  return res;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_KEY}/login`,
    { email, password },
    { withCredentials: true }
  );
  return res;
};

export const refresh = () => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_KEY}/refresh`,
    {},
    { withCredentials: true }
  );
};

export const logout = () => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_KEY}/logout`,
    {},
    { withCredentials: true }
  );
};
