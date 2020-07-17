import {toast} from "react-toastify";

const ErrorToast = ($text) =>
    toast.error($text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    });

export default ErrorToast
