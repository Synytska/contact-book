import MainPage from './pages/MainPage';
import { ContactPage } from './pages/ContactPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Box } from '@mui/material';

function App() {
    return (
        <Router>
            <Container maxWidth="lg" sx={{ paddingX: '150px', paddingY: '36px' }}>
                <Box sx={{ minHeight: '100vh' }}>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/contact/:id" element={<ContactPage />} />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );
}

export default App;

