import { Card, CardActions, FormControl, FormGroup, Input, InputLabel, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import InputMask from 'react-input-mask';

function ClienteCad() {

    const { register, control, handleSubmit } = useForm();
    const [selectedDate, handleDateChange] = useState(new Date());

    const onSubmit = data => console.log(data);

    return (
        <Card>
            <form style={{padding: 20}} onSubmit={handleSubmit(onSubmit)}>
                <FormGroup >
                    <FormControl>
                        <InputLabel>Name: </InputLabel>     
                        <Input {...register('name')} />                    
                    </FormControl>
                    <FormControl>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Controller name="brithdate" control={control} defaultValue={selectedDate}
                                render={()=> <DatePicker label="BirthDate" format='dd/MM/yyyy' value={selectedDate} onChange={handleDateChange}/>
                            }/>                        
                        </MuiPickersUtilsProvider>  
                    </FormControl>
                    <FormControl>
                        <InputLabel>Address: </InputLabel>
                        <Input {...register('address')}/>
                    </FormControl>
                    <FormControl>
                        <InputLabel>ZipCode: </InputLabel>
                        <Input {...register('zipcode')}/>
                    </FormControl>
                </FormGroup>
                <CardActions style={{marginTop: 20}}>
                    <Button size="small" color="secondary">Cancel</Button>
                    <Button size="small" type='submit' variant="contained" color="primary">Save</Button>
                </CardActions>
            </form>
        </Card>
    );
}

export default ClienteCad;