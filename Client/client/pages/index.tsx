import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { io } from "socket.io-client";
import { useQuery } from "react-query";
import { useEffect, useState } from 'react';
import { Cookies } from "react-cookie";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


interface room {
  roomId: string;
  room:{room:[]}
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const cookie = new Cookies();

    const [rooms, setRooms] = useState<room[]>([]);
    const router = useRouter();
    const socket = io("http://localhost:4000/");

    const roomId = uuidv4();
    const userId= uuidv4()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    router.push(`/room/${roomId}`)
    socket.emit("new-room-created", { roomId, userId });
    const data = new FormData(event.currentTarget)

    console.log(data.get("name"),"test")
    
  };


  useEffect(() => {
    async function fetchRooms() {
      const res = await fetch("http://localhost:4000/rooms");
      const { rooms } = await res.json();
      setRooms(rooms);
    }
    fetchRooms();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("new-room-created", ({ room }) => {
      console.log(room,"room");
      setRooms([...rooms, room]);
    });

  }, [socket]);


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoComplete="name"
              autoFocus
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Join
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}


