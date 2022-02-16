import { Card, CardActions, FormControl, FormGroup, Input, InputLabel, Button, TextField, Box, Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import { Delete } from '@material-ui/icons';
import api from '../../services/api';
import { Redirect } from 'react-router-dom';
import { format } from 'date-fns';

function ClienteCad() {
    const [toList, setToList] = useState(false);

    const [clientid] = useState(Math.floor(Math.random() * 9999));
    const { register, control, handleSubmit } = useForm();
    const [selectedDate, handleDateChange] = useState(new Date());
    const [description, setDescription] = useState('');
    const [plate, setPlate] = useState('');
    const [cars, setCars] = useState([]);

    const onSubmit = async(data) => {
        const postData = {...data, clientid, BirthDate: format(selectedDate, 'yyyy-MM-dd')};
        const resultclient = await api.post('clients', postData, { headers: {'Content-Type': 'application/json'}});
        const resultcars = await api.post('cars', cars, { headers: {'Content-Type': 'application/json'}});
        setToList(true);
    };

    const addCar =  () => {
        setCars([...cars, {Description: description, Plate: plate, clientid}]);
        setDescription('');
        setPlate('');
    }

    async function remove(e, item){
        e.preventDefault();
        let listCars = [...cars];
        listCars.splice(cars.indexOf(item), 1);
        setCars(listCars);
      }
    
        if (toList)
        {
            return <Redirect to="/"/>
        }else{

            return (
                <Card>
                    <form style={{padding: 20}} onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup >
                            <FormControl>
                                <InputLabel>Name: </InputLabel>     
                                <Input {...register('Name')} />                    
                            </FormControl>
                            <FormControl>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Controller name="BirthDate" control={control} defaultValue={selectedDate}
                                        render={()=> <DatePicker label="BirthDate" format='dd/MM/yyyy' value={selectedDate} onChange={handleDateChange}/>
                                    }/>                        
                                </MuiPickersUtilsProvider>  
                            </FormControl>
                            <FormControl>
                                <InputLabel>Address: </InputLabel>
                                <Input {...register('Address')}/>
                            </FormControl>
                            <FormControl>
                                <InputLabel>ZipCode: </InputLabel>
                                <Input {...register('ZipCode')}/>
                            </FormControl>
                        </FormGroup>

                        <div style={{padding: 20}}>
                            <div style={{padding: 20, fontWeight: 'bold', backgroundColor: '#CCC'}}>Cars</div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <TextField
                                    label="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <TextField
                                style={{marginLeft: 10}}
                                    label="Plate"
                                    value={plate}
                                    onChange={(e) => setPlate(e.target.value)}
                                />
                                <Button onClick={addCar} variant="contained" color="primary">
                                    Add
                                </Button>
                            </div>    

                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Plate</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cars.map((car) => (
                                            <TableRow key={car.Description}>
                                                <TableCell>{car.Description}</TableCell>
                                                <TableCell>{car.Plate}</TableCell>
                                                <TableCell align="center"><Button onClick={(e) => remove(e, car)} variant="outlined"><Delete /></Button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>         
                        </div>
                        <CardActions style={{marginTop: 20}}>
                            <Button size="small" color="secondary">Cancel</Button>
                            <Button size="small" type='submit' variant="contained" color="primary">Save</Button>
                        </CardActions>
                    </form>
                </Card>
            );
    }
}

export default ClienteCad;