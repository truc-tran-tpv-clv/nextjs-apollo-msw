import React, { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNotify } from "@/api/useNotify";

export function AppError({ duration }: { duration?: number }) {
  const { appError, setAppError } = useAuthStore();
  const { notify } = useNotify();

  useEffect(() => {
    if (appError) {
      notify.error({
        message: appError,
        onClose: () => {
          setAppError("");
        },
        duration,
      });
    }
  }, [appError]);

  return <></>;
}
