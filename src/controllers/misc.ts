import { ServerDataObject } from "../types/serverTypes";

export const generateJoinLink = (server: ServerDataObject) => `fivem://connect/${server.endpoint}?pure_1`;
