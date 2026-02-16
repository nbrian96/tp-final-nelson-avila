export interface CreatePetDTO {
    name: string;
    species: string;
    birthdate?: Date | string | null;
    ownerId: string;
}

export interface UpdatePetDTO {
    name?: string;
    species?: string;
    birthdate?: Date | string | null;
    ownerId?: string;
}
