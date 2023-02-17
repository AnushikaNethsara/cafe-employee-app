import logo from './logo.svg';
import './App.css';
import NavBar from './features/Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Employee from './features/Employee';
import Cafe from './features/Cafe';
import Container from '@mui/material/Container';


function App() {
  return (
    <Router>
      <NavBar />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/employee" element={<Employee />} />
          <Route path="/cafe" element={<Cafe />} />
          <Route path="/" element={<Employee />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
