export interface Veterinarian {
    id: string;
    name: string;
    surname: string;
    medicalLicense: string;
    specialty: string;
    deleted: boolean;
    deletedAt?: Date;
    createdAt: string;
    updatedAt: string;
}

export interface VeterinarianFormData {
    name: string;
    surname: string;
    medicalLicense: string;
    specialty: string;
}

export interface VeterinarianResponse {
    success: boolean;
    data?: Veterinarian | Veterinarian[];
    message?: string;
}
