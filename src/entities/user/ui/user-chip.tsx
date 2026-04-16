import Image from "next/image";

import type { User } from "@/entities/user/api/get-current-user";

type UserChipProps = {
  user: User;
};

export function UserChip({ user }: UserChipProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-sm">
      <Image src={user.avatarUrl} alt={user.name} width={40} height={40} className="rounded-full" />
      <p className="text-sm font-semibold text-foreground">{user.name}</p>
    </div>
  );
}
