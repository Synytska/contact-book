import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HeaderComponent } from './components/HeaderComponent';
import { MainPage } from './pages/MainPage';
import { ContactPage } from './pages/ContactPage';

import { Container, Box } from '@mui/material';

function App() {
    return (
        <Router>
            <HeaderComponent />
            <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', paddingY: '36px' }}>
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

