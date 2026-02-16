import MedicalHistory, { IMedicalHistory } from '../models/medical-history.model';
import { CreateMedicalHistoryDTO, UpdateMedicalHistoryDTO } from '../dto/medical-history.dto';

export class MedicalHistoryService {

    async findAll(userId: string) {
        return await MedicalHistory.find({ userId, deleted: false })
            .populate('petId', 'name species')
            .populate('veterinarianId', 'name surname specialty');
    }

    async findById(id: string, userId: string) {
        return await MedicalHistory.findOne({ _id: id, userId, deleted: false })
            .populate('petId', 'name species')
            .populate('veterinarianId', 'name surname specialty');
    }

    async create(data: CreateMedicalHistoryDTO, userId: string) {
        const medicalHistory = new MedicalHistory({ ...data, userId });
        await medicalHistory.save();
        return medicalHistory;
    }

    async update(id: string, data: UpdateMedicalHistoryDTO, userId: string) {
        return await MedicalHistory.findOneAndUpdate(
            { _id: id, userId, deleted: false },
            data,
            { new: true }
        );
    }

    async deleteMedicalHistory(id: string, userId: string) {
        return await MedicalHistory.findOneAndUpdate(
            { _id: id, userId, deleted: false },
            { deleted: true, deletedAt: new Date() },
            { new: true }
        );
    }

    async deleteByPetId(petId: string, userId: string) {
        return await MedicalHistory.updateMany(
            { petId: petId, userId, deleted: false },
            { deleted: true, deletedAt: new Date() }
        );
    }

    async existsByVeterinarianId(veterinarianId: string) {
        const count = await MedicalHistory.countDocuments({ veterinarianId: veterinarianId, deleted: false });
        return count > 0;
    }
}
