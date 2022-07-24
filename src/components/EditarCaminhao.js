import React from 'react';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom'


const EditarCaminhao = () => {

  const [placa, setPlaca] = useState('')
  const [apelido, setApelido] = useState('')
  const [ano, setAno] = useState('')
  const [cor, setCor] = useState('')
  const [rendimento, setRendimento] = useState('')

  const { id } = useParams();

  useEffect(() => {
    async function getCaminhao() {
      const res = await api.get('/api/caminhao/list/' + id)
      setPlaca(res.data.placa)
      setApelido(res.data.apelido)
      setAno(res.data.ano)
      setCor(res.data.cor)
      setRendimento(res.data.rendimento)
    }

    getCaminhao();
  }, [])

  async function handleSubmit() {

    const data = {
      placa: placa,
      apelido: apelido,
      ano: ano,
      cor: cor,
      rendimento: rendimento
    }

    if (!data.placa || data.placa === '') {
      alert("A Placa é Obrigatória!")
      return;
    }
    if (!data.apelido || data.apelido === '') {
      alert("Apelido é Obrigatório!")
      return;
    }
    if (!data.ano || data.ano === '') {
      alert("Ano é Obrigatório!")
      return;
    }
    if (!data.cor || data.cor === '') {
      alert("Cor é Obrigatório!")
      return;
    }
    if (!data.rendimento || data.rendimento === '') {
      alert("Rendimento é Obrigatório!")
      return;
    }

    //console.log(data)
    try {
      const res = await api.put('/api/caminhoes/update/' + id, data)
      if (res.status === 200) {
        window.location.href = '/list_caminhoes';
      }
    } catch (error) {
      alert('Erro ao cadastrar o caminhão')
    }


  }

  return (
    <div className='container' style={{marginTop:-200}}>
      <h2>Editar o Caminhão</h2>
      <hr />
      <Form className='col-xs-10 col-md-6'>
        <Form.Group className="mb-3">
          <Form.Label><strong>Placa:</strong></Form.Label>
          <Form.Control type="text" placeholder="Placa" value={placa}
            style={{ borderRadius: 80, borderColor: "black" }}
            onChange={e => setPlaca(e.target.value)}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-2" >
          <Form.Label><strong>Apelido:</strong></Form.Label>
          <Form.Control type="text" placeholder="apelido" value={apelido}
            style={{ borderRadius: 80, borderColor: "black" }}
            onChange={e => setApelido(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2" >
          <Form.Label><strong>Ano:</strong></Form.Label>
          <Form.Control type="number"  min="0" placeholder="Ano" value={ano}
            style={{ borderRadius: 80, borderColor: "black" }}
            onChange={e => setAno(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2" >
          <Form.Label><strong>Cor:</strong></Form.Label>
          <Form.Control type="text" placeholder="Cor" value={cor}
            style={{ borderRadius: 80, borderColor: "black" }}
            onChange={e => setCor(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2" >
          <Form.Label><strong>Rendimento:</strong></Form.Label>
          <Form.Control type="number" placeholder="Rendimento" value={rendimento}
            style={{ borderRadius: 80, borderColor: "black" }}
            onChange={e => setRendimento(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit} style={{ marginTop: 14 }}>
          Atualizar
        </Button>
      </Form>
    </div>
  )
}

export default EditarCaminhao;