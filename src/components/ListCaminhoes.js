import React from 'react';
import Table from 'react-bootstrap/Table';
import '../App.css'
import api from '../services/api'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const ListCaminhoes = () => {

  const [caminhoes, setCaminhoes] = useState([]);

  useEffect(() => {
    loadCaminhoes()
  }, [])

  const redireciona = (id) => {
    window.location.href = '/edit_caminhoes/' + id;
  }

  const loadCaminhoes = async () => {
    try {
      const res = await api.get('api/caminhoes/list')
      console.log(res.data);
      setCaminhoes(res.data)
    } catch (error) {
      console.log(error);
      alert("Não foi possível listar os caminhões.")
    }
  }

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Deseja deletar este caminhão? ')) {
        await api.delete('/api/caminhoes/delete/' + id)
        alert('caminhão deletado com sucesso')
        window.location.href = '/list_caminhoes';
      }
    } catch (error) {
      alert('Erro ao excluir o Caminhão');
      console.log(error)
    }
  }

  return (
    <div className='container' style={{marginTop:-200}} >
      <h2>Listagem de Caminhões</h2>
      <hr />
      <Table striped>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Apelido</th>
            <th>Ano</th>
            <th>Cor</th>
            <th>Rendimento</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {caminhoes.map(caminhao => (
            <tr key={caminhao.id}>
              <td>{caminhao.placa}</td>
              <td>{caminhao.apelido}</td>
              <td>{caminhao.ano}</td>
              <td>{caminhao.cor}</td>
              <td>{caminhao.rendimento}</td>
              <td>
                <Button  variant="outline-warning btn-sm" onClick={() => redireciona(caminhao.id)} >
                  Editar
                </Button>
                <Button variant="outline-danger btn-sm" onClick={() => handleDelete(caminhao.id)} >
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ListCaminhoes;