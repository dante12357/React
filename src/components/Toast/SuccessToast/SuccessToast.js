import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const { t, i18n } = useTranslation('translation');
const SuccessToast = ($text) => toast.success(t($text), {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
});


export default SuccessToast
