export interface CreateVeterinarianDTO {
    name: string;
    surname: string;
    medicalLicense: string;
    specialty: string;
}

export interface UpdateVeterinarianDTO {
    name?: string;
    surname?: string;
    medicalLicense?: string;
    specialty?: string;
}
