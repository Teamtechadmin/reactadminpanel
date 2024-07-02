import toast, { ToastOptions } from "react-hot-toast";

const useCustomToast = () => {
  const toastSuccess = (message: string, opts?: ToastOptions) => {
    return toast.success(message, {
      duration: 2000,
      position: "top-right",
      ...(opts && { ...opts }),
    });
  };

  const toastError = (message: string, opts?: ToastOptions) => {
    return toast.error(message, {
      duration: 2000,
      position: "top-right",
      ...(opts && { ...opts }),
    });
  };

  const toastInfo = (message: string, opts?: ToastOptions) => {
    return toast(message, {
      duration: 2000,
      position: "bottom-right",
      ...(opts && { ...opts }),
    });
  };

  return {
    success: (message: string, opts?: ToastOptions) =>
      toastSuccess(message, opts),
    error: (message: string, opts?: ToastOptions) => toastError(message, opts),
    info: (message: string, opts?: ToastOptions) => toastInfo(message, opts),
  };
};

export default useCustomToast;
