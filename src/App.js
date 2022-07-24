import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Link from '@mui/material/Link';
import './App.css';
import Caminhao from './components/Caminhao'
import Orcamento from './components/Orcamento'
import EditarCaminhao from './components/EditarCaminhao'
import ListCaminhoes from './components/ListCaminhoes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



const theme = createTheme();

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>
              <LocalShippingIcon sx={{ mr: 2 }} />
              <Typography variant="h5" color="inherit" noWrap>
                Chega Logo
              </Typography>
              <nav>
            <Link
              variant="h6"
              color="inherit"
              style={{fontSize:14}}
              href="/cad_caminhoes"
              sx={{ my: 1, mx: 1.5 }}
            >
              Cadastrar Caminhões 
            </Link>
            <Link
              variant="h6"
              color="inherit"
              style={{fontSize:14}}
              href="/list_caminhoes"
              sx={{ my: 1, mx: 1.5 }}
            >
              Lista de Caminhões
            </Link>
            <Link
              variant="h6"
              color="inherit"
              style={{fontSize:14}}
              href="/orcamento"
              sx={{ my: 1, mx: 1.5 }}
            >
              Orçamento
            </Link>
          </nav>
            </Toolbar>
          </AppBar>
          <main>
            {/* Hero unit */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
              }}
            >
              <Container maxWidth="sm">

              </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
              {/* End hero unit */}



            </Container>
          </main>
          {/* End footer */}
        </ThemeProvider>

        <Routes>
          <Route path="/cad_caminhoes" element={<Caminhao />} />
          <Route path="/list_caminhoes" element={<ListCaminhoes />} />
          <Route path="/edit_caminhoes/:id" element={<EditarCaminhao />} />
          <Route path="/orcamento" element={<Orcamento />} />
        </Routes>

      </BrowserRouter>
    );
  }
}

export default App;
