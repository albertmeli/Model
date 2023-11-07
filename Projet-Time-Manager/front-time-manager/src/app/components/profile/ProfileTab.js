
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Paper, Avatar, TextField } from "@mui/material";
import { publicRequest } from "../../lib/CallApi";
import { authRequest } from "../../lib/CallApi";

export default function ProfileTab() {
  const [user, setUser] = useState({
    name: "",
    firstname: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      console.log("STILLOK", parsedUserData)
      setUser(parsedUserData[0] || parsedUserData);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const updateUserData = async () => {
    const userData = localStorage.getItem('user');
    const parsedUserData = JSON.parse(userData);
    const userId = parsedUserData[0]?.id || parsedUserData.id;
    // mettre à jour les données de l'utilisateur sans la fonction update
    console.log("info",user);
    publicRequest(`users/${userId}`, {user}, 'PUT')
      .then((res) => {
        if (res.data) {
          localStorage.setItem('user', JSON.stringify(res.data));
          setIsEditing(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Box p={2}>
        <Paper elevation={3} sx={{ maxWidth: 400, margin: "0 auto", position: "relative" }}>
          <Box sx={{ position: 'absolute', left: 0, right: 0, height: "25%", bgcolor: "#f5eff6" }}>

          </Box>
          <Box p={8}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                alt="User Avatar"
                src="/path/to/avatar.jpg"
                sx={{
                  width: 120,
                  height: 120,
                  margin: "30px",
                  cursor: "pointer",
                  padding: "10px",
                  border: "5px solid #f5eff6",
                }}
              />
            </div>
            <div>
              <TextField
                id="name"
                label="Nom"
                variant="outlined"
                value={user.name}
                disabled={!isEditing}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                color="secondary"
                sx={{ margin: "10px 0", width: "100%", marginBottom: "20px" }}
              />

              <TextField
                id="firstname"
                label="Prénom"
                variant="outlined"
                value={user.firstname}
                disabled={!isEditing}
                onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                color="secondary"
                sx={{ margin: "10px 0", width: "100%", marginBottom: "20px" }}
              />

              <TextField
                id="email"
                label="Email"
                variant="outlined"
                value={user.email}
                disabled={!isEditing}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                color="secondary"
                sx={{ margin: "10px 0", width: "100%", marginBottom: "10px" }}
              />
            </div>
          </Box>
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            sx={{ marginTop: "-2em" }}
          >
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  style={{ margin: "10px" }}
                  onClick={updateUserData}
                >
                  Enregistrer
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ margin: "10px 10px 10px 100px" }}
                  onClick={handleEdit}
                >
                  Annuler
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                style={{ margin: "10px" }}
                onClick={handleEdit}
              >
                Modifier
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
