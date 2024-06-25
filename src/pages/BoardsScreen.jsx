import { Box, Container, Typography } from "@mui/material";
import { getBoards } from "../data/getData/get_api_calls";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CreateBoardDialog from "./components/appbars/dialogs/CreateBoardDialog";

import { createNewBoard } from "../data/create/create_api_calls";
import { Link } from "react-router-dom";

function BoardsScreen() {
  //create a function to get all boards
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (message) => {
    setErrorMessage({ message });
    setSnackbarOpen(true);
  };
  const handleClose = () => {
    setSnackbarOpen(false);
  };
  useEffect(() => {
    const getData = async () => {
      const response = await getBoards();
      if (response.error) {
        console.log(
          response.error,
          "error at boardscreen page get all board line 12"
        );
        return;
      }
      setData(response.data);
      setLoading(false);
    };
    getData();
  }, []);

  const createBoard = async (boardName) => {
    if (boardName.length > 1) {
      let value = await createNewBoard(boardName);
      if (value.error) {
        console.log(value.error);
        return;
      }
      const newBoard = [...data];
      newBoard.push(value.data);
      setData(newBoard);
    }
    return;
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container
      sx={{
        width: "90%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ width: "15%", margin: "10px" }}>
        <CreateBoardDialog createNewBoard={createBoard} />
      </Box>
      {data.length > 0 ? (
        data.map((board) => {
          return (
            <Link to={`/${board.id}`} key={board.id}>
              <Box
                key={board.id}
                sx={{
                  display: "flex",
                  width: "200px",
                  justifyContent: "flex-start",
                  alignItems: "baseline",
                  height: "100px",
                  border: "1px solid white",
                  borderRadius: "5px",

                  backgroundColor: "primary.main",
                  margin: 1,

                  boxShadow: 10,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    textTransform: "none",
                    padding: "5%",
                  }}
                >
                  {board.name}
                </Typography>
              </Box>
            </Link>
          );
        })
      ) : (
        <Typography
          sx={{ fontSize: "30px", textAlign: "center", color: "black" }}
        >
          There are no boards{" "}
        </Typography>
      )}
    </Container>
  );
}

export default BoardsScreen;
