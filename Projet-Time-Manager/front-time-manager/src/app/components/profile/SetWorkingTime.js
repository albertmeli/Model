"use client"
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { publicRequest } from '../../lib/CallApi';

export default function SetWorkingTime() {
  const [users, setUsers] = React.useState([]);
  const [name, setName] = React.useState('');
  const [workingTime, setWorkingTime] = React.useState({
    date: "",
    start_shift: '',
    end_shift: '',
    user_id: ''
  });
  const getUser = async () => {
    let u = await publicRequest('users')
    setUsers(u.data)

  }
  const setPlanning = () => {
    console.log(workingTime);
    for (const [key, value] of Object.entries(workingTime)) {
      if (value == "")
        throw new Error(key + ' est vide');

    }
    let data = {
      start_shift: `${workingTime.date} ${workingTime.start_shift}`,
      end_shift: `${workingTime.date} ${workingTime.end_shift}`
    }
    publicRequest(
      `workingtimes/${workingTime.user_id}`,
      { "working_time": data },
      "POST")
  }
  React.useEffect(() => {
    getUser();
  }, [])

  const handleChange = (event) => {
    setName(event.target.value);
    setWorkingTime({
      ...workingTime,
      user_id: event.target.value
    })
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <DemoContainer components={['DatePicker']}>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Employé</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={name}
              label="Employe"
              onChange={handleChange}
            >
              {users.map((user, index) => <MenuItem key={index} value={user.id}>{user.name + " " + user.firstname}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <DatePicker onChange={(event) => {
          let date = event.$d.toLocaleDateString()
          date = date.split('/')
          date.reverse()
          date = date.join('-')
          setWorkingTime({ ...workingTime, date: date })
        }} label="Date" />
        <TimePicker
          label="Début shift"
          defaultValue={dayjs('2022-04-17T08:30')}
          ampm={false}
          onChange={(event) => {
            setWorkingTime({ ...workingTime, start_shift: event.$d.toLocaleTimeString() })
          }}
        />
        <TimePicker
          label="Fin shift"
          defaultValue={dayjs('2022-04-17T18:30')}
          onChange={(event) => {
            setWorkingTime({ ...workingTime, end_shift: event.$d.toLocaleTimeString() })
          }}
          ampm={false}
        />
        <Button variant="contained" onClick={setPlanning}>Enregistrer</Button>
      </DemoContainer>
    </LocalizationProvider>
  );
}