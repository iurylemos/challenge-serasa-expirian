import { type SetupWorker as ISetupWorker, setupWorker } from "msw/browser";
import { offerHandlers } from "@/src/mocks/handlers/offer.handler";

export const getWorker = (): ISetupWorker => {
  if (typeof window === "undefined") {
    throw new Error("MSW worker can only be created in the browser");
  }

  return setupWorker(...offerHandlers);
};
