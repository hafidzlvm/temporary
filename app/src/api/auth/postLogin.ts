import { instance } from "..";
import { AuthLogin } from "@/models/Auth";
import { MutationFunction } from "@tanstack/react-query";

export type PostLoginQueryKey = [string, string];

export type PostLoginResponse = {
  token: string;
};

export const postLogin: MutationFunction<PostLoginResponse, AuthLogin> = async (
  data,
) => {
  const response = await instance.post("/login", data).catch((error) => {
    throw error;
  });
  return response?.data;
};
