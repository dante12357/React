import {toast} from "react-toastify";

const SuccessToast = ($text) =>
    toast.success($text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    });


export default SuccessToast
