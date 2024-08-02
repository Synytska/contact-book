import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
    return (
        <Router>
        <div className='max-w-[1280px] min-w-[400px] px-[150px] py-[36px]'>
            <MainPage />
            <Routes>
            <Route path="/contact/:id" element={<ContactPage />} />
            </Routes>
        </div>
        </Router>
    );
}

export default App;

