import type {} from "@redux-devtools/extension"; // required for devtools typing
import z from "zod";
import { isValidUrl } from "../utils/validateURL";

// ============================================================================
// SERVER STORE
// ============================================================================

export type Server =
  | {
      serverURL?: string;
    }
  | undefined;
const DEFAULT_SERVER: Server = {
  serverURL: "https://qq-stepwise-api.querium.com/",
};
export const ServerSchema = z.object({
  serverURL: z.string().url(),
}) satisfies z.ZodType<Server>;

export const validateServer = (server: Server) => {
  const serverValidation = ServerSchema.safeParse(server);
  if (
    serverValidation.success &&
    typeof server?.serverURL === "string" &&
    isValidUrl(server.serverURL)
  ) {
    return server;
  } else {
    console.error("Invalid server URL:", server?.serverURL);
    return DEFAULT_SERVER;
  }
};
