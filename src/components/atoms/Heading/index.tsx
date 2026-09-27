import type { JSX } from "react";

type HeadingProps = {
  title: string;
  subtitle: string;
};

export default function Heading({
  title,
  subtitle,
}: Readonly<HeadingProps>): JSX.Element {
  return (
    <div className="my-8">
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}
