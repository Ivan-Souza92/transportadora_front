import React from "react";

import Caminhao from '../components/Caminhao'
import Orcamento from '../components/Orcamento'
import EditarCaminhao from '../components/EditarCaminhao'
import ListCaminhoes from '../components/ListCaminhoes';
import Localidade from '../components/Localidade'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Rotas = () => {
    return (
        <Routes>
            <Route path="/cad_caminhoes" element={<Caminhao />} />
            <Route path="/orcamento" element={<Orcamento />} />
            <Route path="/list_caminhoes" element={<ListCaminhoes />} />
            <Route path="/edit_caminhoes/:id" element={<EditarCaminhao />} />
            <Route element={<Localidade />} path="/localidades" />
        </Routes>
    )
}

export default Rotas