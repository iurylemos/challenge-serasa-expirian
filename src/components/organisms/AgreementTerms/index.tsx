import { useId, type JSX } from "react";
import { AgreementTermsConstants } from "@/src/components/organisms/AgreementTerms/AgreementTerms.constants";
import TextButton from "@/src/components/atoms/TextButton";

type AgreementTermsProps = {
  terms: string[];
  isAccepted: boolean;
  onAcceptedChange: (isAccepted: boolean) => void;
  onReadFullTerms: () => void;
};

export default function AgreementTerms({
  terms,
  isAccepted,
  onAcceptedChange,
  onReadFullTerms,
}: Readonly<AgreementTermsProps>): JSX.Element {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <h2 id={titleId} className="font-semibold text-gray-900">
        {AgreementTermsConstants.TERMS}
      </h2>

      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 marker:text-gray-400">
        {terms.map((term) => (
          <li key={term}>{term}</li>
        ))}
      </ul>

      <TextButton
        label={AgreementTermsConstants.READ_FULL}
        chevronEnabled
        onClick={onReadFullTerms}
        className="mt-4 text-blue-700"
      />

      <div className="mt-4 border-t border-gray-200 pt-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-900">
          <input
            type="checkbox"
            checked={isAccepted}
            onChange={(event) => onAcceptedChange(event.target.checked)}
            className="size-4 cursor-pointer accent-blue-600"
          />
          {AgreementTermsConstants.READ_ACCEPT}
        </label>
      </div>
    </section>
  );
}
