import logo from './logo.svg';
import './App.css';
import NavBar from './features/Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Employee from './features/Employee';
import Cafe from './features/Cafe';
import AddEmployee from './features/AddEmployee';
import AddCafe from './features/AddCafe';
import Container from '@mui/material/Container';
import { Provider } from "react-redux";
import store from './store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <ToastContainer />
        <Container maxWidth="xl">
          <Routes>
            <Route path="/employee/:id" element={<Employee />} />
            <Route path="/cafe" element={<Cafe />} />
            <Route path="/addemployee" element={<AddEmployee />} />
            <Route path="/addemployee/:id" element={<AddEmployee />} />
            <Route path="/addcafe" element={<AddCafe />} />
            <Route path="/addcafe/:id" element={<AddCafe />} />
            <Route path="/" element={<Employee />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
