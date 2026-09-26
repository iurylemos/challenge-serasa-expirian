import { type SetupWorker as ISetupWorker, setupWorker } from "msw/browser";
import { offerHandlers } from "@/src/mocks/handlers/offer.handler";

export const worker: ISetupWorker = setupWorker(...offerHandlers);
