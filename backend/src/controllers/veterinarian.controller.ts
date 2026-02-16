import { Request, Response } from 'express';
import { VeterinarianService } from '../services/veterinarian.service';
import { CreateVeterinarianDTO, UpdateVeterinarianDTO } from '../dto/veterinarian.dto';

const veterinarianService = new VeterinarianService();

export const getSpecialists = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const specialists = await veterinarianService.findAllSpecialists(userId);
        res.status(200).json({ success: true, data: specialists });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const createVeterinarian = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const veterinarianData: CreateVeterinarianDTO = req.body;
        await veterinarianService.create(veterinarianData, userId);
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

export const getVeterinarianById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const veterinarian = await veterinarianService.findById(req.params.id as string, userId);
        if (!veterinarian) {
            res.status(404).json({ success: false, message: 'Veterinarian not found' });
            return;
        }
        res.status(200).json({ success: true, data: veterinarian });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const updateVeterinarian = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const updateData: UpdateVeterinarianDTO = req.body;
        const veterinarian = await veterinarianService.update(req.params.id as string, updateData, userId);
        if (!veterinarian) {
            res.status(404).json({ success: false, message: 'Veterinarian not found' });
            return;
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

export const deleteVeterinarian = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const veterinarian = await veterinarianService.delete(req.params.id as string, userId);
        if (!veterinarian) {
            res.status(404).json({ success: false, message: 'Veterinarian not found' });
            return;
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};
