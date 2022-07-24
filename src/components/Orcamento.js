import React from 'react';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import api from '../services/api';
import Alert from 'react-bootstrap/Alert';


const Orcamento = () => {

    const [localidades, setLocalidades] = useState([]);
    const [caminhoes, setCaminhoes] = useState([]);
    const [gasolina, setGasolina] = useState();
    const [idLoc, setIdLocal] = useState('');
    const [idCam, setIdCam] = useState('');
    const [distancia, setDistancia] = useState('');
    const [label, setLabel] = useState('');
    const [consumoEsperado, setConsumoEsperado] = useState('')
    const [rendimento, setRendimento] = useState('');
    const [apelido, setApelido] = useState('');
    const [locDestino, setLocDestino] = useState('')
    const [valorMA] = useState(5000)
    const [custoTViagem, setCustoTViagem] = useState('')
    const [precoFinal, setPrecoFinal] = useState('')



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

    const loadLocalidades = async () => {
        try {
            const res = await api.get('/api/localidades/list')
            console.log(res.data);
            setLocalidades(res.data)
        } catch (error) {
            console.log(error);
            alert("Não foi possível listar as localidades.")
        }
    }


    const fazerOrcamento = async () => {

        if (!idCam || idCam === '') {
            alert("Selecione um Caminhão!")
            return;
        }

        if (!idLoc || idLoc === '') {
            alert("Selecione uma Localidade!")
            return;
        }
        if (!gasolina || gasolina === '') {
            alert("Informe o preço da gasolina!")
            return;
        }

        try {

            const res = await api.get('/api/localidade/' + idLoc);
            const res2 = await api.get('/api/caminhao/list/' + idCam)
            setApelido(res2.data.apelido)
            setLocDestino(res.data.nome)

            const ce = (res.data.distancia * 2) / res2.data.rendimento;
            const cte = (ce * gasolina) + 4000;
            const pf = cte + (cte * 20 / 100)

            setPrecoFinal(pf.toFixed(2))
            setCustoTViagem(cte.toFixed(2))
            setConsumoEsperado(ce.toFixed(2));
            setLabel(
                <Alert variant='danger'>
                    <strong>Confira abaixo os dados do orçamento!</strong>
                </Alert>)

        } catch (error) {
            console.log("Não foi possivel carregar os dados")
        }
    }


    const reset = () => {

        setGasolina('');
        window.location.href = '/orcamento';

    }

    useEffect(() => {
        loadLocalidades()
        loadCaminhoes()
    }, [])

    return (
        <div className='container' style={{ marginTop: -200 }}>
            <h2>Orçamento</h2>
            <hr />
            <Form className='col-xs-10 col-md-6'>

                <Form.Group className="mb-3" controlId="listCaminhao">
                    <Form.Label><strong>Selecione o Caminhão:</strong></Form.Label>
                    <Form.Select aria-label="Default select example" value={idCam} onChange={e => setIdCam(e.target.value)} style={{ borderRadius: 80, borderColor: "black" }}>
                        <option>Selecione o Caminhão</option>
                        {caminhoes.map(caminhao => (
                            <option value={caminhao.id}>{caminhao.apelido}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="listLocalidades">
                    <Form.Label><strong>Selecione a Localidade:</strong></Form.Label>
                    <Form.Select aria-label="Default select example" value={idLoc} onChange={e => setIdLocal(e.target.value)} style={{ borderRadius: 80, borderColor: "black" }}>
                        <option>Selecione a Localidade</option>
                        {localidades.map(localidade => (
                            <option value={localidade.id}>{localidade.nome}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="listCombustivel" >
                    <Form.Label><strong>Preço do Combustivel:</strong></Form.Label>
                    <Form.Control type="number" min="0" placeholder="Preço do Combustivel"
                        style={{ borderRadius: 80, borderColor: "black" }}
                        value={gasolina || ''}
                        onChange={e => setGasolina(e.target.value)}
                    />
                </Form.Group>

                <Button variant="dark btn-sm" onClick={fazerOrcamento} style={{ marginTop: 14 }}>
                    Realizar Orçamento
                </Button>
                <Button variant="danger btn-sm" onClick={reset} style={{ marginLeft: 10, marginTop: 14 }}>
                    Limpar Campos
                </Button>

            </Form>

            <hr />
                {label}
            <hr />
            <Form className='col-xs-10 col-md-6'>
                <Form.Group className="mb-2" >
                    <Form.Label><strong>Apelido:</strong></Form.Label>
                    <Form.Control type="text" style={{ borderRadius: 80, borderColor: "black" }} value={apelido} disabled />
                </Form.Group>
                <Form.Group className="mb-2" >
                    <Form.Label><strong>Localidade de Destino:</strong></Form.Label>
                    <Form.Control type="text" style={{ borderRadius: 80, borderColor: "black" }} value={locDestino} disabled />
                </Form.Group>
                <Form.Group className="mb-2" >
                    <Form.Label><strong>Consumo Esperado:</strong></Form.Label>
                    <Form.Control type="text" style={{ borderRadius: 80, borderColor: "black" }} value={consumoEsperado} disabled />
                </Form.Group>
                <Form.Group className="mb-2" >
                    <Form.Label><strong>Preço do Combustivel:</strong></Form.Label>
                    <Form.Control type="text" style={{ borderRadius: 80, borderColor: "black" }} value={gasolina} disabled />
                </Form.Group>
                <Form.Group className="mb-2" >
                    <Form.Label><strong>Pagamento do Motorista e do Ajudante:</strong></Form.Label>
                    <Form.Control type="text" style={{ borderRadius: 80, borderColor: "black" }} value={valorMA} disabled />
                </Form.Group>
                <Form.Group className="mb-2" >
                    <Form.Label><strong>Custo Total da Viagem:</strong></Form.Label>
                    <Form.Control type="text" style={{ borderRadius: 80, borderColor: "black" }} value={custoTViagem} disabled />
                </Form.Group>
                <Form.Group className="mb-2" >
                    <Form.Label><strong>Preço Final:</strong></Form.Label>
                    <Form.Control type="text" style={{ borderRadius: 80, borderColor: "black" }} value={precoFinal} disabled />
                </Form.Group>
            </Form>
        </div>
    )

}



export default Orcamento