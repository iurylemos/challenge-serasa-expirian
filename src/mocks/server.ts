import { SetupServer as ISetupServer, setupServer } from "msw/node";
import { offerHandlers } from "@/src/mocks/handlers/offer.handler";

export const server: ISetupServer = setupServer(...offerHandlers);
