"use client";
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import { publicRequest } from '../lib/CallApi';
import { Link } from 'react-router-dom';


export default function Connexion() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState({
    value: "none",
    type: "info",
  });

  const submit = () => {
    //console.log("user", user);
    publicRequest('users/auth', { user: user }, 'POST')
      .then((res) => {
        if (res.data.length === 1) {
          localStorage.setItem('user', JSON.stringify(res.data));

          setMessage({ ...message, value: "Connexion réussie", type: "success" });
          setTimeout(() => {
            setMessage({ value: "nome", type: "info" });
          }, 5000);

          window.location = '/profile';

        }
        else {
          throw new Error('Mot de passe ou identifiant invalide');
        }

      })
      .catch((error) => {
        if (error.message === "Mot de passe ou identifiant invalide") {
          console.log(error);
          setMessage({ ...message, value: error.message, type: "error" });
        } else {
          setMessage({ ...message, value: "Une erreur est survenue, veuillez réessayer ou contacter le webmaster", type: "error" });
        }

        setTimeout(() => {
          setMessage({ value: "none", type: "info" });
        }, 5000);
      });
  }

  return (
    <Box
      sx={{
        height: "99vh",
        display: "flex",
        justifyContent: 'center',
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {connected ? <Navigate to='/' /> : ""}
      <Alert sx={{ justifyContent: 'center', margin: 1, position: 'absolute', top: 0, right: 0, left: 0, display: (message.value === "none" ? "none" : "flex") }} severity={message.type}>{message.value}</Alert>
      {!connected &&
        <Sheet
          sx={{
            width: 350,
            py: 5,
            px: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1" textAlign={'center'}>
              <b>Connectez-vous !</b>
            </Typography>
            <Typography level="body2" textAlign={'center'}>Renseignez tous les champs pour continuer</Typography>
          </div>

          <TextField
            name="email"
            type="email"
            placeholder="E-mail"
            label="E-mail"
            value={user.email}
            onChange={(e) => {
              setUser(user => ({
                ...user,
                email: e.target.value
              }))
            }}
          />
              <TextField
            name="password"
            type="password"
            placeholder="Votre mot de passe"
            label="Mot de passe"
            value={user.password}
            onChange={(e) => {
              setUser(user => ({
                ...user,
                password: e.target.value
              }))
            }}
          />

          <Button
            style={{
              color: "white",
              backgroundColor: "#B2076D",
              borderRadius: 7,
              padding: 10,
              width: 100,
              margin: 'auto',
              cursor: 'pointer',
              border: 'none'
            }}
            onClick={() => {
              submit();
            }}
          >
            Connexion
          </Button>
          <Typography
            endDecorator={<Link to="/inscription">Inscription</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Vous n'avez pas encore de compte ?
          </Typography>
        </Sheet>
      }
    </Box>
  );
}