import { getCurrentUser } from "@/entities/user/api/get-current-user";
import { UserChip } from "@/entities/user/ui/user-chip";

export async function ProfileSection() {
  const user = await getCurrentUser();

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-foreground">Explorer Profile</h2>
      <UserChip user={user} />
    </section>
  );
}
