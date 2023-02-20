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
import { MatchProvider } from './contexts/MatchContext';
import MatchSettings from './components/MatchSettings';

function App() {
  return (
        <>
            <AuthProvider>
                <MatchProvider>
                    <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                      <Route
                          path="/matchsettings"
                          element={
                              <ProtectedRoute>
                                  <MatchSettings key="1"/>
                              </ProtectedRoute>
                          }
                      />

                    <Route
                        path="/app"
                        element={
                            <ProtectedRoute>
                                <AppTabsComponent />
                            </ProtectedRoute>
                        }
                    />
                    </Routes>
                </MatchProvider>
            </AuthProvider>
        </>
    );
}

export default App;
