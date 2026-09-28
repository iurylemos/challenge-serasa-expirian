import type { JSX } from "react";
import type { HeadingProps } from "@/src/interfaces/heading.interface";

export default function Heading({
  title,
  subtitle,
}: Readonly<HeadingProps>): JSX.Element {
  return (
    <div className="my-8">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-base text-gray-500">{subtitle}</p>
    </div>
  );
}
