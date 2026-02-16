import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Login from '@pages/Login';
import Register from '@pages/Register';
import VeterinarianList from '@pages/VeterinarianList';
import VeterinarianForm from '@pages/VeterinarianForm';

import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import ScrollToTopButton from '@components/ScrollToTopButton';
import ProtectedRoute from '@components/ProtectedRoute';
import { useAuthValidation } from './hooks/useAuthValidation';

function App() {
  useAuthValidation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/veterinarians"
            element={
              <ProtectedRoute>
                <VeterinarianList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/veterinarians/new"
            element={
              <ProtectedRoute>
                <VeterinarianForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/veterinarians/edit/:id"
            element={
              <ProtectedRoute>
                <VeterinarianForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <ScrollToTopButton />
      <Footer />
    </Box>
  );
}

export default App;
