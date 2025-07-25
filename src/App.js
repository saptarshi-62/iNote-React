//import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  // PrivateRoute component to protect routes
  const PrivateRoute = ({ children }) => {
    const auth = localStorage.getItem('authToken');
    return auth ? children : <Navigate to="/login" />;
  };

  return (
    <>
    <NoteState showAlert={showAlert}>
      <Router>
        <AppContent alert={alert} showAlert={showAlert} />
      </Router>
    </NoteState>
    </>
  );
}

const AppContent = ({ alert, showAlert }) => {
  const navigate = useNavigate();

  // PrivateRoute component to protect routes
  const PrivateRoute = ({ children }) => {
    const auth = localStorage.getItem('authToken');
    return auth ? children : <Navigate to="/login" />;
  };

  // Logout function to clear token and redirect to login
  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    showAlert('Logged out successfully', 'success');
  };

  return (
    <>
      <Navbar logout={logout} />
      <Alert alert={alert} />
      <div className="container">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={
            <PrivateRoute>
              <Home showAlert={showAlert} />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          {/* Redirect any unknown route to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
