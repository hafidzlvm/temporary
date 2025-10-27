import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { useAuthStore } from "@/hooks/zustand/useAuthStore";
import { useEffect } from "react";
import { useGetVerify } from "@/hooks/api/auth/useGetVerify";
import NotFound from "@/pages/OtherPage/NotFound";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { isAuthenticated, authenticate, discredit } = useAuthStore();
  const { data, isSuccess, isError, isFetching } = useGetVerify();

  useEffect(() => {
    if (isFetching) {
      return;
    }
    const token = window.localStorage.getItem("token");
    if (token && isSuccess) {
      authenticate(data);
      return;
    }

    if (isError || !token) {
      discredit();
    }
  }, [isSuccess, data, authenticate, discredit, isError, isFetching]);

  return isAuthenticated ? (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <>
      {isFetching ? (
        <div className="fixed left-0 top-0 z-999999 flex h-screen w-screen items-center justify-center bg-white dark:bg-black">
          {" "}
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-brand-500 border-t-transparent" />
        </div>
      ) : isSuccess ? (
        <></>
      ) : (
        <NotFound />
      )}
    </>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
