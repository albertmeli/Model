import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { publicRequest } from '../lib/CallApi';
import { useEffect } from 'react';

const Pointer = ({userId}) => {
    
    // cette varaible correspond à l'état du pointage: false lorsque l'user pointe pour partir, true lorsqu'il pointe pour entré
    const [buttonValue, setbuttonValue] = useState(false)

    //cette fonction récupère le dernier status connus de l'utilisateur lors du pointage afin de savoir si il est encore en poste ou déjà sorti
    const getStatus = async ()=>{
        let u = await publicRequest(`clock/last/${userId}`)
        setbuttonValue(u?.data[0].status)
    }
    function genWeek(dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        const startDate = new Date(year, month - 1, day);
        const weekDates = [];
      
        for (let i = 0; i < 7; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          weekDates.push(currentDate.toDateString());
        }
      
        return weekDates;
      }
      
      const dateStr = "27/08/2023";
      const weekDates = genWeek(dateStr);
      
     
      
    //action de pointage
    const pointer = async ()=>{
        setbuttonValue(!buttonValue);
        res = await publicRequest(`clock/${userId}`,{status:!buttonValue},'POST');
        console.log()
    }
    useEffect(() => {
      getStatus()
      console.log("Dates de la semaine :", weekDates);
    }, [])
    
    return (
        <Box sx={{
            boxShadow: 3,
            width:"300px",
            padding:"2em",
            borderRadius:1
        }}>
            <Typography textAlign={'center'} variant='h5'>
                Pointeur
            </Typography>
            <Box justifyContent={'center'} display={'flex'} pt={2}>
                <Button 
                    variant='outlined'
                    color={(!buttonValue ? "success" : "error")}
                    onClick={pointer}
                >
                    {(!buttonValue ? "Entrer" : "Sortir")}
                </Button>
            </Box>
        </Box>
    );
};

export default Pointer;