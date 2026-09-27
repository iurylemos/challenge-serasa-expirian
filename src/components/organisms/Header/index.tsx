import type { JSX } from "react";
import UserGreeting from "@/src/components/molecules/UserGreeting";

type HeaderProps = {
  userName: string;
  userInitials: string;
};

export default function Header({
  userName,
  userInitials,
}: Readonly<HeaderProps>): JSX.Element {
  return (
    <header className="space-y-4 border-b border-gray-200 bg-white px-6 py-4">
      <div className="mx-auto flex w-full max-w-6xl flex-row justify-between">
        <span className="font-bold text-gray-900">Minhas Dívidas</span>
        <UserGreeting name={userName} initials={userInitials} />
      </div>
    </header>
  );
}
