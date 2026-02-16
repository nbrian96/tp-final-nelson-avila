import { Request, Response, NextFunction } from 'express';
import { MedicalHistoryService } from '../services/medical-history.service';
import { CreateMedicalHistoryDTO, UpdateMedicalHistoryDTO } from '../dto/medical-history.dto';

const medicalHistoryService = new MedicalHistoryService();

export const getMedicalHistories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const medicalHistories = await medicalHistoryService.findAll(userId);
        res.status(200).json({ success: true, data: medicalHistories });
    } catch (error) {
        next(error);
    }
};

export const getMedicalHistoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const medicalHistory = await medicalHistoryService.findById(req.params.id as string, userId);
        if (!medicalHistory) {
            return res.status(404).json({ success: false, message: 'Medical History not found' });
        }
        res.status(200).json({ success: true, data: medicalHistory });
    } catch (error) {
        next(error);
    }
};

export const createMedicalHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        await medicalHistoryService.create(req.body, userId);
        res.status(201).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const updateMedicalHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const updateData: UpdateMedicalHistoryDTO = req.body;
        const medicalHistory = await medicalHistoryService.update(req.params.id as string, updateData, userId);
        if (!medicalHistory) {
            return res.status(404).json({ success: false, message: 'Medical History not found' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const deleteMedicalHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const medicalHistory = await medicalHistoryService.deleteMedicalHistory(req.params.id as string, userId);
        if (!medicalHistory) {
            return res.status(404).json({ success: false, message: 'Medical History not found' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
