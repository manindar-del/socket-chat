import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { io } from "socket.io-client";
import PositionedMenu from "../../components/header";
import { useRouter } from "next/router";

interface chat {
  received: any;
  message: { received: [] | any } | any;
}

export default function index() {
  const socket = io("http://localhost:4000/");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<chat[]>([]);
  
  const [typing, setTyping] = useState(false);

  const router = useRouter();
  console.log(chat, "router");

  function handleForm(e: React.SyntheticEvent): void {
    e.preventDefault();
    console.log(socket, "socket");
    socket.emit("send-message", { message });
    setChat((prev) => [...prev, { message, received: false }]);
    setMessage("");
  }

  function handleInput(e: React.SyntheticEvent | any): void {
    setMessage(e.target.value);
    //socket.emit("typing-started", {  });
  }

  useEffect(() => {
    if (!socket) return;
    socket.emit("join-room", { roomId: router.query.id });

    socket.on("message-from-server", (data) => {
      setChat((prev) => [...prev, { message: data.message, received: true }]);
    });
  }, []);

  return (
    <div>
      <Box sx={{ marginBottom: 5 }}>
        {chat.map((data) => (
          <Typography
            sx={{ textAlign: data.received ? "right" : "left" }}
            key={data.message}
          >
            {data.message}
          </Typography>
        ))}
      </Box>

      <Box component="form" onSubmit={handleForm}>
        {typing && (
          <InputLabel sx={{ color: "white" }} shrink htmlFor="message-input">
            Typing...
          </InputLabel>
        )}
        <OutlinedInput
          sx={{ backgroundColor: "white" }}
          size="small"
          fullWidth
          id="message-input"
          value={message}
          placeholder="Write your message"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={handleInput}
          endAdornment={
            <IconButton type="submit" edge="end">
              <SendIcon />
            </IconButton>
          }
        />
      </Box>
    </div>
  );
}
