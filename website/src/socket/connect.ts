import { Notify } from "notiflix";

export function onConnect() {
    Notify.success("Connected to server", {
        pauseOnHover: true,
        clickToClose: true,
    });
}
