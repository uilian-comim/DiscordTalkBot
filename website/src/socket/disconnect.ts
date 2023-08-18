import { Notify } from "notiflix";

export function onDisconnect() {
    Notify.failure("Connection lost", {
        pauseOnHover: true,
        clickToClose: true,
    });
}
