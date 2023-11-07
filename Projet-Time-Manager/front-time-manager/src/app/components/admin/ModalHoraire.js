"use client"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { publicRequest } from '../../lib/CallApi';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Slide from '@mui/material/Slide';
import 'dayjs/locale/fr';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalHoraire({handleClose, openHoraire, selectedRow}) {
    const [currentPage, setcurrentPage] = React.useState(0)
    const [workingTimes, setWorkingTimes] = React.useState([])
    const [selectDateAndId, setSelectDateAndId] = React.useState([])
    const [formattedStartShiftOutput, setFormattedStartShiftOutput] = React.useState('');
    const [formattedEndShiftOutput, setFormattedEndShiftOutput] = React.useState('');
    const [editRow, setEditRow] = React.useState({});
    const [workingTime, setWorkingTime] = React.useState({
      start_shift:'',
      end_shift:''
  });

    const getWorkingTimes = async () => {
      const currentDate = dayjs();
      let formatedUserTime = [];
      let userTime = await publicRequest(`workingtimes/${selectedRow}`);
    
      if (userTime && userTime.data) {
      let page = 0;
      let index = 0;
    
      userTime.data.forEach((user) => {
        const startShiftDate = dayjs(user.start_shift);
    
        if (index > 4) {
          index = 0;
          page++;
        }
    
        if (startShiftDate >= currentDate) {
          const formated = {
            id: user.id,
                Jour: dayjs(user.start_shift).$d.toLocaleDateString('fr-FR',{ weekday: 'long' }),
                Date: dayjs(user.start_shift).$d.toLocaleDateString(),
                "Arrivé": dayjs(user.start_shift).$d.toLocaleTimeString(),
                "Départ" : dayjs(user.end_shift).$d.toLocaleTimeString()
          };
          formatedUserTime.push(formated);
        }
    
        if (currentDate > startShiftDate) {
          setcurrentPage(page);
        }
    
        index++;
      });
    
      setWorkingTimes(formatedUserTime);
    } else {
      console.log("userTime ou userTime.data est indéfini");
    }
    };

    React.useEffect(() => {
      getWorkingTimes()
    }, [currentPage, editRow, selectedRow])
    
    const handleRowClick = (params) => {
      const dateValue = params.row.Date;
      const arriveeValue = params.row.Arrivé;
      const departValue = params.row.Départ;
      
      const formattedDate = dayjs(dateValue, 'DD/MM/YYYY', 'en');
      
      const startShift = dayjs(arriveeValue, 'HH:mm:ss');
      const endShift = dayjs(departValue, 'HH:mm:ss');
      
      const formattedStartShiftOutput = 
        formattedDate.format('YYYY-MM-DD') 
        + 'T' 
        + startShift.format('HH:mm:ss');
      const formattedEndShiftOutput = 
        formattedDate.format('YYYY-MM-DD') 
        + 'T' 
        + endShift.format('HH:mm:ss');
    
      setSelectDateAndId(params.row);
      setFormattedStartShiftOutput(formattedStartShiftOutput);
      setFormattedEndShiftOutput(formattedEndShiftOutput);
    };
    
    const handleUpdateWorkingTime = () => {
  if (formattedStartShiftOutput && formattedEndShiftOutput) {
    
    if (!workingTime.start_shift) {
      workingTime.start_shift = dayjs(formattedStartShiftOutput).format('HH:mm:ss');
    }
    if (!workingTime.end_shift) {
      workingTime.end_shift = dayjs(formattedEndShiftOutput).format('HH:mm:ss');
    }
    const dateParts = selectDateAndId.Date.split('/');
    const convertedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

    const start_shift = convertedDate + 'T' + workingTime.start_shift;
    const end_shift = convertedDate + 'T' + workingTime.end_shift;

    let data = {
      start_shift: `${start_shift}`,
      end_shift: `${end_shift}`
  }
  
  const updatedWorkingTime = {
    ...workingTime,
    start_shift: workingTime.start_shift,
    end_shift: workingTime.end_shift,
  };

  for (const [key, value] of Object.entries(updatedWorkingTime)) {
      if (!value) {
        throw new Error(key + ' est vide');
      }
    }

    publicRequest(
      `workingtimes/${selectDateAndId.id}`,
      { "working_time": data },
      "PUT"
    );

      setEditRow(data);

  } else {
    console.log('Les valeurs de départ et de fin ne sont pas définies.');
  }
};

  return (
    <div>
      <Dialog
        open={openHoraire}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
      <Box sx={{ 
          height: 370,
           width: '100%',
           '& .cold': {
              backgroundColor: '#808080',
              color: '#bdbdbd',
            },
            '& .hot': {
              backgroundColor: '#ff943975',
              color: '#1a3e72',
            },
            '& .current': {
              backgroundColor: '#C1D8C1',
              color: '#1a3e72',
            },
       }}>
        <DataGrid
          onRowClick={(params) => {
            handleRowClick(params);
          }}
          columns={[
            { field: 'Jour', headerClassName:'primary' },
            { field: 'Date' }, 
            { field: 'Arrivé' },
            { field: 'Départ',width:200 }]}
          rows={workingTimes}
          initialState={{
              pagination:{
                  paginationModel: {
                      pageSize: 5,
                      page:currentPage
                      },
              }
          }}
          rowSpacingType="border"
          getRowClassName={(params) => {
              let currentDate = new Date()
              let rowColor = "";        
              let date = params.row.Date
              let [day, month, year] = date.split('/');

              date = new Date(year, month - 1, day);
              if(currentDate.toLocaleDateString() == date.toLocaleDateString())
                  rowColor = "current"
              else if(currentDate > date)
                  rowColor = "cold"
              else
                  rowColor = ""
                  
              return rowColor;
            }}
          pageSizeOptions={[5]}
        />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <DemoContainer components={['DatePicker']}>
        <TimePicker
          label="Début du travail"
          value={dayjs(formattedStartShiftOutput)}
          ampm={false}
          onChange={(event)=>{
            setWorkingTime({...workingTime,start_shift:event.$d.toLocaleTimeString()})
          }}
        />
        <TimePicker
          label="Fin du travail"
          value={dayjs(formattedEndShiftOutput)}
          ampm={false}
          onChange={(event)=>{
            setWorkingTime({...workingTime,end_shift:event.$d.toLocaleTimeString()})
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
          <Button onClick={handleUpdateWorkingTime}>Modifier</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}