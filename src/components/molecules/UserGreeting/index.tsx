import type { JSX } from "react";
import { VariantSize } from "@/src/interfaces/variant.enum";
import Avatar from "@/src/components/atoms/Avatar";

type UserGreetingProps = {
  name: string;
  initials: string;
};

export default function UserGreeting({
  name,
  initials,
}: Readonly<UserGreetingProps>): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-black font-bold">Olá, {name}</span>
      <Avatar initials={initials} size={VariantSize.SM} />
    </div>
  );
}
