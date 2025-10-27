import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getKapimProfile,
  KapimProfileKey,
  KapimProfileResponse,
} from "@/api/auth/getKapimProfile";
import { AxiosError } from "axios";

type UseKapimProfileReturn = UseQueryResult<KapimProfileResponse, AxiosError>;

export const useGetVerify = (): UseKapimProfileReturn => {
  const queryKey: KapimProfileKey = ["auth", "verify"];
  const data = useQuery<
    KapimProfileResponse,
    AxiosError,
    KapimProfileResponse,
    KapimProfileKey
  >({
    queryKey,
    queryFn: getKapimProfile,
    retry: 1,
  });
  return data;
};
