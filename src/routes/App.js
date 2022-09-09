import React from "react";
import { BrowserRouter,Routes , Route } from 'react-router-dom'
import App from '../pages/js/App'
const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={ <App/>} />
            <Route path="*" element={ (<><h1>Pagina no encontrada</h1></>) } />
        </Routes>
    </BrowserRouter>
)

export default AppRouter