import { create } from 'zustand';
import { PetType } from '../schemaValidations/pet.schema';

interface PetStore {
    pets: PetType[];
    totalPages: number;
    setPets: (pets: PetType[]) => void;
    setTotalPages: (totalPages: number) => void;
}

export const usePetStore = create<PetStore>((set) => ({
    pets: [],
    totalPages: 1,
    setPets: (pets: PetType[]) => set({pets}),
    setTotalPages: (totalPages: number) => set({ totalPages }),
}))
