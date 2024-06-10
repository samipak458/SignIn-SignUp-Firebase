import './App.css';
import SignUpForm from './SignUpForm';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpForm />}> </Route>
        <Route path="/login" element={<Login />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
