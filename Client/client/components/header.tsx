import { Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";


interface socket{
  socket:string | unknown | any
}


function PositionedMenu({socket}:socket) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter()
 
  ///console.log(roomId,"roomId")

  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   //setAnchorEl(event.currentTarget);
  //   router.push(`/room/${roomId}`)
  //   socket.emit("new-room-created", { roomId });

  // };
  const handleClose = () => {

    setAnchorEl(null);
  };

  //console.log(uuidv4,"uuidv4")
  return (
    <div>
      <Button
        id="demo-positioned-button"
        //onClick={handleClick}
      >
        Room
      </Button>


     
    </div>
  );
}

export default PositionedMenu;
