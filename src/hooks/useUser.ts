import { FullUserInfo } from "@/types";
import { create } from "zustand";

const useUser = create<State>((set, get) => ({
  user: null,
  setUserManually: (user) => set({ user }),
  refetchUser: async () => {
    const user = get().user;
    const fetchRes = await fetch(`/api/users/${user?.id}`);
    if (fetchRes.status == 200) {
      const u = (await fetchRes.json()) as {
        message: string;
        user: FullUserInfo;
      };
      set({ user: u.user });
    }
  },
}));

export default useUser;

type State = {
  user: FullUserInfo | null;
  setUserManually: (user: FullUserInfo) => void;
  refetchUser: () => Promise<void>;
};
