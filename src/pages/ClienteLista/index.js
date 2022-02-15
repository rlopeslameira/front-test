import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

import {Delete} from '@material-ui/icons';

import api from '../../services/api';
import { format } from 'date-fns';


function ClienteLista() {

  const [lista, setLista] = useState([]);

  async function loadList() {
    let response = await api.get('clients');

    setLista(response.data);
  }

  useEffect(() => {
    loadList();
  }, [])

  async function remove(e, item){
    e.preventDefault();
    console.log(item);
    let response = await api.delete('clients', {data: item});
    console.log(response.data);
    loadList();
  }

  return (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="left">Endereço</TableCell>
                <TableCell>Veículos</TableCell>
                <TableCell align="center">Data Nasc.</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lista.map((row) => (
                <TableRow
                  key={row.clientId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>                  
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">
                  {row.cars.map(car => (
                    <div key={car.description}>{car.description}</div>
                  ))}
                  </TableCell>
                  <TableCell align="center">{format(new Date(row.birthDate), 'dd/MM/yyyy')}</TableCell>
                  <TableCell align="center"><Button onClick={(e) => remove(e, row)} variant="outlined"><Delete /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}

export default ClienteLista;