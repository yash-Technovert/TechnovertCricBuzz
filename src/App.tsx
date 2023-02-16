import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/match.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import AppTabsComponent from './components/AppTabsComponent';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoutes';
import SignUp from './components/SignUp/SignUp';
import { AuthProvider } from './contexts/AuthProvider';

function App() {
  return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/app"
                        element={
                            <ProtectedRoute>
                                <AppTabsComponent />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
