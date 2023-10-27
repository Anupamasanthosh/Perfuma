
import { toast } from 'react-toastify';
export const  showToastMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
 export  const showToastMessageError = (err) => {
    toast.error(err, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };