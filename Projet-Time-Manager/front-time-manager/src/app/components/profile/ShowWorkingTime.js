"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { publicRequest } from '../../lib/CallApi';
import dayjs from 'dayjs';

export default function ShowWorkingTime({user_id}) {
    const [currentPage, setcurrentPage] = React.useState(0)
    const [workingTimes, setWorkingTimes] = React.useState([])
    const getWorkingTimes = async ()=>{
        const currentDate = new Date();
        let formatedUserTime = [];
        let userTime = await publicRequest(`workingtimes/${user_id}`);
        let page = 0;
        let index = 0
       
        userTime.data.map(user=>{
            
            if(index>4){
                index = 0
                page++;
            }
            
            if(currentDate > new Date( user.start_shift))
                setcurrentPage(page)
            index++;
            let formated = {
                id: user.id,
                Jour: dayjs(user.start_shift).$d.toLocaleDateString('fr-FR',{ weekday: 'long' }),
                Date: dayjs(user.start_shift).$d.toLocaleDateString(),
                "Arrivé": dayjs(user.start_shift).$d.toLocaleTimeString(),
                "Départ" : dayjs(user.end_shift).$d.toLocaleTimeString()
            }
            formatedUserTime.push(formated)
        })
        
        setWorkingTimes(formatedUserTime)
    }
    React.useEffect(() => {
      getWorkingTimes()
    }, [currentPage])
    
  return (
    <Box sx={{ 
        height: 370,
         width: '30%',
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
        columns={[{ field: 'Jour', headerClassName:'primary' },{ field: 'Date' }, { field: 'Arrivé' },{ field: 'Départ',width:200 }]}
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
        // sx={{ '& .MuiDataGrid-row': { borderTopColor: 'yellow', borderTopStyle: 'solid' } }}
        getRowClassName={(params) => {
            let currentDate = new Date()
           // currentDate = currentDate.$d.toLocaleDateString();
           let rowColor = "";        
            let date = params.row.Date
            // Divise la chaîne en jour, mois et année
            let [day, month, year] = date.split('/');
            // Crée un nouvel objet Date
            date = new Date(year, month - 1, day);
            //date = dayjs(date)
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
  );
}