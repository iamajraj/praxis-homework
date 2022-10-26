import { toast } from "react-toastify";

export const TYPE_SUCCESS = "SUCCESS";
export const TYPE_ERROR = "ERROR";

export default (text, type) => {
    switch (type) {
        case TYPE_SUCCESS:
            toast.success(text, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                pauseOnFocusLoss: false,
                progress: undefined,
                theme: "light",
            });
            break;
        case TYPE_ERROR:
            toast.error(text, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                pauseOnFocusLoss: false,
                progress: undefined,
                theme: "light",
            });
            break;
    }
};
