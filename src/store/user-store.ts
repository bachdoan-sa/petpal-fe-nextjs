import { create } from 'zustand';
import { UserType } from '../schemaValidations/user.schema';

interface UserStore {
    user: UserType[];
    sessionToken: string | undefined;
    setUser: (pets: UserType[]) => void;
    setSessionToken: (sessionToken: string | undefined) => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: [],
    sessionToken: "",
    setUser: (user: UserType[]) => set({user}),
    setSessionToken: (sessionToken: string | undefined) => set({sessionToken}),
}))
