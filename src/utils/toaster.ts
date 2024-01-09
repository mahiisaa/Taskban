import { toast } from "react-toastify";

export const errorToaster = (errors) => {
    errors.map((error) => {
      toast.error(error);
    });
  };

  export const successToaster = (messages) => {
    messages.map((message) => {
      toast.success(message);
    });
  };