import { postLogin } from "@/api/auth/postLogin";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { PostLoginResponse } from "@/api/auth/postLogin";
import { AuthLogin } from "@/models/Auth";
import { AxiosError } from "axios";

export const usePostLogin = (): UseMutationResult<
  PostLoginResponse,
  AxiosError<{
    status: number;
    message: string;
  }>,
  AuthLogin
> => {
  const mutation = useMutation<
    PostLoginResponse,
    AxiosError<{
      status: number;
      message: string;
    }>,
    AuthLogin
  >({
    mutationFn: postLogin,
  });

  return mutation;
};
