"use client";

import { useContext, useState } from "react";
import { type UseMutateFunction, useMutation } from "@tanstack/react-query";
import { AgreementService } from "@/src/services/agreement/agreement.service";
import {
  SnackbarContext,
  type SnackbarContextValue,
} from "@/src/contexts/Snackbar/Snackbar.context";
import { SnackbarVariant } from "@/src/interfaces/variant.enum";
import type { AgreementDataConfirm } from "@/src/interfaces/agreement.interface";

type ConfirmAgreementFunc = UseMutateFunction<
  AgreementDataConfirm,
  Error,
  void,
  unknown
>;

export type ConfirmAgreementData = {
  confirmAgreement: ConfirmAgreementFunc;
  isConfirming: boolean;
  isSuccess: boolean;
  resetAgreement: () => void;
  isTermsAccepted: boolean;
  setIsTermsAccepted: (term: boolean) => void;
};

export function useConfirmAgreement(): ConfirmAgreementData {
  const { showSnackbar } = useContext<SnackbarContextValue>(SnackbarContext);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);

  const { mutate, isPending, isSuccess, reset } = useMutation({
    mutationFn: AgreementService.confirm,
    onSuccess: (): void => {
      showSnackbar("Acordo confirmado com sucesso!", SnackbarVariant.SUCCESS);
    },
    onError: (): void => {
      showSnackbar(
        "Não foi possível confirmar o acordo. Tente novamente.",
        SnackbarVariant.ERROR,
      );
    },
  });

  const resetTerms = (): void => {
    setIsTermsAccepted(false);
    reset();
  };

  return {
    confirmAgreement: mutate,
    isConfirming: isPending,
    isSuccess,
    resetAgreement: resetTerms,
    isTermsAccepted,
    setIsTermsAccepted,
  };
}
