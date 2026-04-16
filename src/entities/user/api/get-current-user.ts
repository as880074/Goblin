import { apiRequest } from "@/shared/api/client";
import { getBaseUrl } from "@/shared/lib/env";

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export async function getCurrentUser(): Promise<User> {
  return apiRequest<User>(`${getBaseUrl()}/api/users/current`, {
    next: { revalidate: 3600 },
    transform: (payload) => {
      const user = payload as { id: string; firstName: string; lastName: string; image: string };
      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        avatarUrl: user.image,
      };
    },
  });
}
