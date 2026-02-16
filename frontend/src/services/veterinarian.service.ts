import { API_BASE_URL } from '../constants';
import type { Veterinarian, VeterinarianFormData, VeterinarianResponse } from '../interfaces/veterinarian.interface';

const API_URL = `${API_BASE_URL}/veterinarians`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const veterinarianService = {
    async getAll(): Promise<Veterinarian[]> {
        const response = await fetch(API_URL, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener veterinarios');
        }

        const data: VeterinarianResponse = await response.json();
        return data.data as Veterinarian[];
    },

    async getById(id: string): Promise<Veterinarian> {
        const response = await fetch(`${API_URL}/${id}`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Error al obtener veterinario');
        }

        const data: VeterinarianResponse = await response.json();
        return data.data as Veterinarian;
    },

    async create(veterinarianData: VeterinarianFormData): Promise<void> {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(veterinarianData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al crear veterinario');
        }
    },

    async update(id: string, veterinarianData: VeterinarianFormData): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(veterinarianData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al actualizar veterinario');
        }
    },

    async delete(id: string): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al eliminar veterinario');
        }
    }
};
