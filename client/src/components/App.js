import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GamePage from '../pages/GamePage'; 

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate replace to="/games" />} />
                <Route path='/games' element={<GamePage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

