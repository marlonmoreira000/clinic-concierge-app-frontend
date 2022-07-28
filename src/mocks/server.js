import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Here we import the handler created!
export const mockServer = setupServer(...handlers);
