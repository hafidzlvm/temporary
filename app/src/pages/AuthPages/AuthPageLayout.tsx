import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link, useNavigate } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import { useAuthStore } from "@/hooks/zustand/useAuthStore";
import { useEffect } from "react";
import { useGetVerify } from "@/hooks/api/auth/useGetVerify";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authenticate, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { data, isSuccess, isFetchedAfterMount } = useGetVerify();

  useEffect(() => {
    if (isSuccess) {
      authenticate(data);
      navigate("/");
      return;
    }
  }, [isSuccess, authenticate, navigate, data]);

  return isFetchedAfterMount && !isAuthenticated ? (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                {/*<img
                  width={231}
                  height={48}
                  src={`${ViteConfiguration.BASE_PATH_URL}/images/logo/auth-logo.svg"
                  alt="Logo"
                />*/}
                <h1 className="text-2xl font-sans relative text-white">
                  Kapal Pintar{" "}
                  <span className="text-xs absolute -top-2 right-0 translate-x-8/12">
                    Management
                  </span>
                </h1>
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                Take a peek at how easy management can be—visit your dashboard
                today!
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  ) : (
    <div className="fixed left-0 top-0 z-999999 flex h-screen w-screen items-center justify-center bg-white dark:bg-black">
      {" "}
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-brand-500 border-t-transparent"></div>
    </div>
  );
}
