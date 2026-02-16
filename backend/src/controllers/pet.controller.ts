import { Request, Response } from 'express';
import { PetService } from '../services/pet.service';
import { CreatePetDTO, UpdatePetDTO } from '../dto/pet.dto';

const petService = new PetService();

export const getPets = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const pets = await petService.findAll(userId);
        res.status(200).json({ success: true, data: pets });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const getPetById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const pet = await petService.findById(req.params.id as string, userId);
        if (!pet) {
            res.status(404).json({ success: false, message: 'Pet not found' });
            return;
        }
        res.status(200).json({ success: true, data: pet });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const createPet = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const petData: CreatePetDTO = req.body;
        await petService.create(petData, userId);
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

export const updatePet = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const updateData: UpdatePetDTO = req.body;
        const pet = await petService.update(req.params.id as string, updateData, userId);
        if (!pet) {
            res.status(404).json({ success: false, message: 'Pet not found' });
            return;
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

export const deletePet = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const pet = await petService.delete(req.params.id as string, userId);
        if (!pet) {
            res.status(404).json({ success: false, message: 'Pet not found' });
            return;
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};
