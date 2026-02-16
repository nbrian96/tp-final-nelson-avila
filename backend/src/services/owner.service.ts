import Owner, { IOwner } from '../models/owner.model';
import Pet from '../models/pet.model';
import { CreateOwnerDTO, UpdateOwnerDTO } from '../dto/owner.dto';

export class OwnerService {

    async findAll(userId: string): Promise<IOwner[]> {
        return await Owner.find({ userId, deleted: false });
    }

    async findById(id: string, userId: string): Promise<IOwner | null> {
        return await Owner.findOne({ _id: id, userId, deleted: false });
    }

    async findByDni(dni: number, userId: string): Promise<IOwner | null> {
        return await Owner.findOne({ dni: dni, userId, deleted: false });
    }

    async create(data: CreateOwnerDTO, userId: string): Promise<IOwner> {
        return await Owner.create({ ...data, userId });
    }

    async update(id: string, data: UpdateOwnerDTO, userId: string): Promise<IOwner | null> {
        return await Owner.findOneAndUpdate(
            { _id: id, userId, deleted: false },
            data,
            { new: true }
        );
    }

    async delete(id: string, userId: string): Promise<IOwner | null> {
        const owner = await Owner.findOneAndUpdate(
            { _id: id, userId, deleted: false },
            { deleted: true, deletedAt: new Date() },
            { new: true }
        );

        if (owner) {
            await Pet.updateMany(
                { ownerId: id, deleted: false },
                { deleted: true, deletedAt: new Date() }
            );
        }

        return owner;
    }
}
