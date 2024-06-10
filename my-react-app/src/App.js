import './App.css';
import SignUpForm from './SignUpForm';
import Login from './Login';
import UserProfile from './userProfile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpForm />}> </Route>
        <Route path="/login" element={<Login />}> </Route>
        <Route path="/userProfile" element={<UserProfile />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
