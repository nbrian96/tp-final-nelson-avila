export interface CreateOwnerDTO {
    name: string;
    surname: string;
    dni: number;
    phone: string;
    address?: string | null;
}

export interface UpdateOwnerDTO {
    name?: string;
    surname?: string;
    dni?: number;
    phone?: string;
    address?: string | null;
}
