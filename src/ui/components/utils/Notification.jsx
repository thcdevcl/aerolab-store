import { store } from "react-notifications-component";

export default ({
  title = "Success",
  message = "",
  type = "success",
  error
}) => {
  store.addNotification({
    title: error ? "Error" : title,
    message: error ? error : message,
    type: error ? "danger" : type,
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
      pauseOnHover: true
    },
    touchSlidingExit: {
      swipe: {
        duration: 400,
        timingFunction: "ease-out",
        delay: 0
      },
      fade: {
        duration: 400,
        timingFunction: "ease-out",
        delay: 0
      }
    },
    width: 220
  });
};
