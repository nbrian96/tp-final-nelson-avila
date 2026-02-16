import Veterinarian, { IVeterinarian } from '../models/veterinarian.model';
import { MedicalHistoryService } from './medical-history.service';
import { CreateVeterinarianDTO, UpdateVeterinarianDTO } from '../dto/veterinarian.dto';

const medicalHistoryService = new MedicalHistoryService();

export class VeterinarianService {

    async findAllSpecialists(userId: string): Promise<IVeterinarian[]> {
        return await Veterinarian.find(
            { userId, deleted: false },
            { name: 1, surname: 1, specialty: 1, medicalLicense: 1, id: '$_id', _id: 0 }
        );
    }

    async create(data: CreateVeterinarianDTO, userId: string): Promise<IVeterinarian> {
        return await Veterinarian.create({ ...data, userId });
    }

    async findById(id: string, userId: string): Promise<IVeterinarian | null> {
        return await Veterinarian.findOne({ _id: id, userId, deleted: false });
    }

    async update(id: string, data: UpdateVeterinarianDTO, userId: string): Promise<IVeterinarian | null> {
        return await Veterinarian.findOneAndUpdate(
            { _id: id, userId, deleted: false },
            data,
            { new: true }
        );
    }

    async delete(id: string, userId: string): Promise<IVeterinarian | null> {
        const hasMedicalHistory = await medicalHistoryService.existsByVeterinarianId(id);
        if (hasMedicalHistory) {
            throw new Error('Cannot delete veterinarian with existing medical records.');
        }

        return await Veterinarian.findOneAndUpdate(
            { _id: id, userId, deleted: false },
            { deleted: true, deletedAt: new Date() },
            { new: true }
        );
    }
}
