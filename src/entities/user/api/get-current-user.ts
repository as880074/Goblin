export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

const MOCK_USER: User = {
  id: "u_1",
  name: "Pet Explorer",
  avatarUrl: "/avatar.svg",
};

export async function getCurrentUser(): Promise<User> {
  return MOCK_USER;
}
