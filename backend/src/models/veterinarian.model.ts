import mongoose, { Document, Schema } from 'mongoose';

export interface IVeterinarian extends Document {
    name: string;
    surname: string;
    medicalLicense: string;
    specialty: string;
    userId: mongoose.Types.ObjectId;
    deleted: boolean;
    deletedAt: Date;
}

const VeterinarianSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        trim: true,
    },
    medicalLicense: {
        type: String,
        required: true,
        trim: true,
    },
    specialty: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

VeterinarianSchema.index({ medicalLicense: 1 }, { unique: true, partialFilterExpression: { deleted: false } });

export default mongoose.model<IVeterinarian>('Veterinarian', VeterinarianSchema);
