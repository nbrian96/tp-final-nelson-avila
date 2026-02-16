export interface CreateMedicalHistoryDTO {
    petId: string;
    veterinarianId: string;
    registrationDate?: Date | string;
    description: string;
}

export interface UpdateMedicalHistoryDTO {
    petId?: string;
    veterinarianId?: string;
    registrationDate?: Date | string;
    description?: string;
}
