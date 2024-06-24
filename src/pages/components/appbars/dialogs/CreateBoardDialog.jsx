import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

// import createNewBoard from "../../../../data/create/create_board";

export default function CreateBoardDialog({createNewBoard}) {

  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState("");

  const handleOnChange = (event) => {
    setBoardName(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true); 
  };
  const handleClose = () => {
    setOpen(false);
  };
  const createBoard = (event) => {
    setOpen(false);
    event.preventDefault();
    createNewBoard(boardName,event);
    handleClose();
  }


  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          textTransform: "none",
          padding:"5%",
          boxShadow:10,
          // height:,
          width:150
        }}
      >
      Create New Board
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit:{
            createBoard,
          
          },
        }}
      >
        <DialogTitle>Create a NewBoard </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Enter Board Name"
            fullWidth
            variant="standard"
            onChange={(event) => handleOnChange(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={createBoard}>
            create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
