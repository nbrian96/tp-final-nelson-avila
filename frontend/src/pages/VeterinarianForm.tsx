import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Typography,
    TextField,
    Alert,
    CircularProgress,
    Grid,
    InputAdornment
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import { veterinarianService } from '../services/veterinarian.service';
import type { VeterinarianFormData } from '../interfaces/veterinarian.interface';

const VeterinarianForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState<VeterinarianFormData>({
        name: '',
        surname: '',
        medicalLicense: '',
        specialty: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [initialLoading, setInitialLoading] = useState(isEditMode);

    useEffect(() => {
        if (isEditMode && id) {
            loadVeterinarian(id);
        }
    }, [id, isEditMode]);

    const loadVeterinarian = async (vetId: string) => {
        try {
            setInitialLoading(true);
            const vet = await veterinarianService.getById(vetId);
            setFormData({
                name: vet.name,
                surname: vet.surname,
                medicalLicense: vet.medicalLicense,
                specialty: vet.specialty
            });
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setInitialLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.name || !formData.surname || !formData.medicalLicense || !formData.specialty) {
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            setLoading(true);
            if (isEditMode && id) {
                await veterinarianService.update(id, formData);
            } else {
                await veterinarianService.create(formData);
            }
            navigate('/veterinarians');
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <Container sx={{ mt: 20, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={80} />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 6, mb: 10 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/veterinarians')}
                sx={{ mb: 4, borderRadius: 2 }}
            >
                Volver al listado
            </Button>

            <Card sx={{ borderRadius: 4, boxShadow: '0 20px 50px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <Box sx={{ bgcolor: 'primary.main', py: 3, px: 4, color: 'white' }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        {isEditMode ? 'Editar Especialista' : 'Registrar Especialista'}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Completa la información profesional del veterinario
                    </Typography>
                </Box>

                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }} onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Nombre"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    disabled={loading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Apellido"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Matrícula Médica"
                                    name="medicalLicense"
                                    value={formData.medicalLicense}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    disabled={loading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BadgeIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder="MN-0000"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Especialidad"
                                    name="specialty"
                                    value={formData.specialty}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    disabled={loading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SchoolIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    helperText="Ej: Cirugía, Dermatología, Clínica General"
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', gap: 2, mt: 6 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                disabled={loading}
                                fullWidth
                                sx={{
                                    borderRadius: 3,
                                    py: 2,
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    boxShadow: '0 10px 20px rgba(25, 118, 210, 0.2)'
                                }}
                            >
                                {loading ? 'Guardando...' : isEditMode ? 'Guardar Cambios' : 'Registrar Veterinario'}
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/veterinarians')}
                                disabled={loading}
                                sx={{ borderRadius: 3, px: 4 }}
                            >
                                Cancelar
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default VeterinarianForm;
