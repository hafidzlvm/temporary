import { AuthVerifyData } from "@/models/Auth";
import { QueryFunction } from "@tanstack/react-query";
import { instance } from "..";

export type KapimProfileKey = [string, string];

export type KapimProfileResponse = AuthVerifyData;

export const getKapimProfile: QueryFunction<
  KapimProfileResponse,
  KapimProfileKey
> = async ({ signal }) => {
  const data = await instance
    .get("/u/kapim-profile", {
      signal,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
    .catch((e) => {
      throw e;
    });
  
  return data.data;
};
