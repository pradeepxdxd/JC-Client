import io from "socket.io-client";
import { APP_URL } from "../dev";

export const socket = io(APP_URL);