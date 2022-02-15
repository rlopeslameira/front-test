import { TextField, Card, CardActions, FormControl, FormGroup, Input, InputLabel, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import {KeyboardDatePicker } from '@material-ui/pickers';

function ClienteCad() {
    

    const { register, handleSubmit, getValues, setValue } = useForm({
        defaultValues: {
            name: '',
            birthDate: new Date(),
        }
    });
    const [date, setDate] = useState(new Date());
    const value = getValues('fieldName');

    useEffect(() => {
        register('fieldName');
      }, [register]);

      useEffect(() => {
        setDate(value || null);
      }, [setDate, value]);

    const onSubmit = data => console.log(data);

    return (
        <Card>
            <FormGroup style={{padding: 20}} onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <InputLabel>Name: </InputLabel>     
                    <Input {...register('name')} />                    
                </FormControl>
                <FormControl style={{marginTop: 10}}>
                    <InputLabel>Address: </InputLabel>
                    <KeyboardDatePicker
                        value={date}
                        onChange={(date) => setValue('fieldName', date, { shouldValidate: true, shouldDirty: true })}
                    />
                </FormControl>
                <FormControl style={{marginTop: 10}}>
                    <InputLabel>Address: </InputLabel>
                    <Input {...register('address')}/>
                </FormControl>
            </FormGroup>
            <CardActions >
                <Button size="small" color="secondary">Cancelar</Button>
                <Button size="small" variant="contained" color="primary">Gravar</Button>
        </CardActions>
        </Card>
    );
}

export default ClienteCad;