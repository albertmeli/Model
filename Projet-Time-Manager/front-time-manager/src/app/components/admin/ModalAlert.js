"use client"
import * as React from 'react';
import { publicRequest } from '../../lib/CallApi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Button } from '@mui/material';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAlert({ handleClose, openAlert, selectedRow }) {
  const handleValide = () => {
    if (selectedRow) {
      const idUser = selectedRow.id;
      console.log(idUser);
      publicRequest(`users/` + idUser, {}, 'DELETE')
      handleClose();
    }
  };
  console.log("selectedRow: " + selectedRow);
    return (
      <div>
        <Dialog
          open={openAlert}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          {selectedRow && (
            <>
              <p>
                Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedRow.name}{" "}
                {selectedRow.firstname}
              </p>
              <DialogActions>
                <Button onClick={handleClose}>Non</Button>
                <Button onClick={handleValide}>Oui</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </div>
    );
  }
  