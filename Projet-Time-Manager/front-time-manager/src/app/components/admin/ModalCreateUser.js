import * as React from 'react';
import { publicRequest } from '../../lib/CallApi';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import CryptoJS from 'crypto-js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCreateUser({ handleClose, openCreate, onCreateUserSuccess }) {
  const [createUser, setCreateUser] = React.useState({
    name: '',
    firstname: '',
    email: '',
    password: ''
  });

  const handleValide = () => {
    if (areAllFieldsFilled(createUser)) {
      const hashedPassword = CryptoJS.PBKDF2(createUser.password, process.env.salt, {
        keySize: 512 / 32,
        iterations: 1000,
      });
      const encryptedName = CryptoJS.AES.encrypt(createUser.name, process.env.secretKey).toString();
      const encryptedFirstname = CryptoJS.AES.encrypt(createUser.firstname, process.env.secretKey).toString();
      const encryptedEmail = CryptoJS.AES.encrypt(createUser.email, process.env.secretKey).toString();

      const userData = {
        name: encryptedName,
        firstname: encryptedFirstname,
        email: encryptedEmail,
        password: hashedPassword.toString(CryptoJS.enc.Base64),
      };

      publicRequest('users', { user: userData }, 'POST');
      onCreateUserSuccess();
      handleClose();
    }
  };

  const areAllFieldsFilled = (user) => {
    return Object.values(user).every((value) => value.trim() !== '');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreateUser({ ...createUser, [name]: value });
  };

  return (
    <div>
      <Dialog
        open={openCreate}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <>
          <div style={{ textAlign: "center", marginBottom: "15px", fontSize: "20px", fontWeight: "bold", paddingTop: "20px" }}>
            Ajouter un nouvel employé
          </div>
          <div style={{ padding: "15px", margin: "25px", width:350 }}>
            <form>
              <TextField
                sx={{ width: "100%", marginBottom: "15px" }}
                type="text"
                label="Nom"
                variant="outlined"
                name="name"
                value={createUser.name}
                onChange={handleChange}
              />
              <TextField
                sx={{ width: "100%", marginBottom: "15px" }}
                type="text"
                label="Prénom"
                variant="outlined"
                name="firstname"
                value={createUser.firstname}
                onChange={handleChange}
              />
              <TextField
                sx={{ width: "100%", marginBottom: "15px" }}
                type="email"
                label="Email"
                variant="outlined"
                name="email"
                value={createUser.email}
                onChange={handleChange}
              />
              <TextField
                sx={{ width: "100%", marginBottom: "15px" }}
                type="password"
                label="Mot de passe"
                variant="outlined"
                name="password"
                value={createUser.password}
                onChange={handleChange}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" color="primary" onClick={handleValide}>
                  Valider
                </Button>
                <Button onClick={handleClose} variant="outlined" color="secondary">
                  Annuler
                </Button>
              </div>
            </form>
          </div>
        </>
      </Dialog>
    </div>
  );
}
