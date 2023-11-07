"use client"
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Button as BaseButton } from '@mui/base/Button';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import ModalHoraire from './ModalHoraire';
import ModalAlert from './ModalAlert';
import ModalCreateUser from './ModalCreateUser';
import CryptoJS from 'crypto-js';
import ModalClose from '@mui/joy/ModalClose';
import Drawer from '@mui/material/Drawer';
import DialogTitle from '@mui/material/DialogTitle';




export default function WorkerList() {
  const [page, setPage] = React.useState(0);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // fetch pour recupérer les utilisateurs
  useEffect(() => {
    fetch('http://localhost:4000/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(responseData => {
        const decryptedData = responseData.data.map(user => ({
          name: CryptoJS.AES.decrypt(user.name, process.env.secretKey).toString(CryptoJS.enc.Utf8),
          firstname: CryptoJS.AES.decrypt(user.firstname, process.env.secretKey).toString(CryptoJS.enc.Utf8),
          email: CryptoJS.AES.decrypt(user.email, process.env.secretKey).toString(CryptoJS.enc.Utf8),
          // Autres champs de données le cas échéant
        }));
        setData(decryptedData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCreateUserSuccess = () => {
    // Mise à jour de la liste des utilisateurs après la création réussie
    fetch('http://localhost:4000/api/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(responseData => {
        const decryptedData = responseData.data.map(user => ({
          name: CryptoJS.AES.decrypt(user.name, process.env.secretKey).toString(CryptoJS.enc.Utf8),
          firstname: CryptoJS.AES.decrypt(user.firstname, process.env.secretKey).toString(CryptoJS.enc.Utf8),
          email: CryptoJS.AES.decrypt(user.email, process.env.secretKey).toString(CryptoJS.enc.Utf8),
          // Autres champs de données le cas échéant
        }));
        setData(decryptedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // calcule le nombre d'utilisateurs par page
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  // function pour gerer la liste des utilisateurs par page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // état de la modal
  const [openHoraire, setOpenHoraire] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleClickOpen = (sortedRows) => {
    setSelectedRow(sortedRows);
    setOpenHoraire(true);
  };

  const createUser = () => {
    setOpenCreate(true);
  };

  const radierFunction = (sortedRows) => {
    // console.log("sortedRows: ", sortedRows);
    setSelectedRow(sortedRows);
    setOpenAlert(true);
  };

  // gestion des differents bouton fermer
  const handleClose = () => {
    if (openHoraire == true) {
      setOpenHoraire(false);

    }
    else if (openAlert == true) {
      setOpenAlert(false);

    }
    else if (openCreate == true) {
      setOpenCreate(false);

    }
    else {
      console.log('mes if fnctionne pas');
    }
  };

  //const pour trier la liste des utilisateurs par leurs noms
  const compareByName = (a, b) => a.name.localeCompare(b.name);
  const sortedRows = data.slice().sort(compareByName);
  // return du component WorkerList
  return (
    <ListeFormat aria-label={"liste des employers gerer par le manager"}>
      <ModalHoraire
        handleClose={handleClose}
        openHoraire={openHoraire}
        selectedRow={selectedRow} />
      <ModalAlert
        handleClose={handleClose}
        openAlert={openAlert}
        selectedRow={selectedRow} />
      <ModalCreateUser
        handleClose={handleClose}
        openCreate={openCreate}
        onCreateUserSuccess={handleCreateUserSuccess} />
      <Root sx={{ maxWidth: '100%', width: "90%" }}>
        <table aria-label="tableau des employers">
          <thead>
            <tr>
              <th className="column-name">Name</th>
              <th className="column-name">Firstname</th>
              <th>Email</th>
              <th>Horaire</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : sortedRows
            ).map((sortedRows) => (
              <tr key={sortedRows.id}>
                <td className="column-name">{sortedRows.name}</td>
                <td className="column-name">{sortedRows.firstname}</td>
                <td style={{ width: 160 }} align="right">
                  {sortedRows.email}
                </td>
                <td style={{ width: 160 }} align="right">
                  <Button onClick={() => handleClickOpen(sortedRows.id)}>Horaire</Button>
                </td>
                <td style={{ width: 160 }} align="right">
                  <Button onClick={() => modifierFunction(sortedRows)}>Modifier</Button>
                  <Button onClick={() => radierFunction(sortedRows)}
                    style={{
                      backgroundColor: 'red',
                      border: '1px solid red',
                      boxShadow: '0 4px 6px rgba(255, 0, 0, 0.2), 0 6px 8px rgba(255, 0, 0, 0.15)'
                    }}>Radier
                  </Button>
                </td>
              </tr>
            ))}
            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={3} aria-hidden />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    'aria-label': 'rows per page',
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
        <Button onClick={() => createUser()}>creer Employer</Button>
      </Root>
    </ListeFormat>
    
  );
}

// diver CSS pour le style des boutons et de la liste des utilisateurs
const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const hideColumnsCSS = `
  @media (max-width: 520px) {
    .column-name {
      display: none;
    }
  }
`;

const style = document.createElement('style');
style.innerHTML = hideColumnsCSS;
document.head.appendChild(style);

const ListeFormat = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  height: 100vh;
`;

const Button = styled(BaseButton)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  font-size: 0.675rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  margin: 3px 3px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 127, 255, 0.5)'
    }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }

  &:disabled {
    background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    cursor: not-allowed;
    box-shadow: none;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    }
  }
  `,
);

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;