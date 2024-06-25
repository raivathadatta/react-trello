import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllListsFromBoard } from "../data/getData/get_api_calls";
import ListScreenAppBar from "./components/appbars/ListScreenAppBar";
import { Typography, Box, Snackbar, Alert } from "@mui/material";
import { createNewList } from "../data/create/create_api_calls";
import FormInput from "./components/appbars/form/FormInput";
import { deleteListByListId } from "../data/delete/delete_api_calls";
import ListCardContainer from "./containers/CardContainer";
import CircularProgress from "@mui/material/CircularProgress";

function ListScreen() {
  let { boardId } = useParams();
  const [listData, setListData] = useState({});

  const [addListInputVisibility, setAddListInputVisibility] = useState(false);
  const [newListValue, setNewListValue] = useState("");
  const [loader, setLoader] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (message) => {
    setErrorMessage( message );
    setSnackbarOpen(true);
  };

  const getLists = async () => {
    const response = await getAllListsFromBoard(boardId);
    if (response.error) {
      handleError(response.error);

      return;
    }
    const data = response.data;

    setListData(data);
    setLoader(false);
  };
  useEffect(() => {
    getLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId]);

  const addNewList = async () => {
    setAddListInputVisibility(!addListInputVisibility);

    const response = await createNewList(newListValue, boardId);
    if (response.error) {
      handleError(response.error);
      return;
    }
    const newList = [...listData];
    newList.push(response.data);
    setListData(newList);
    setNewListValue("");
  };

  const toggleAddListInput = () => {
    setAddListInputVisibility(!addListInputVisibility);
  };

  const setNewListTitle = (event) => {
    setNewListValue(event.target.value);
  };

  const deleteList = async (listId) => {
    const response = await deleteListByListId(listId);
    if (response.error) {
      handleError();
      return;
    }
    const listDataCopy = listData.filter((item) => item.id != listId);
    setListData(listDataCopy);
  };
  if (loader) {
    return <CircularProgress color="success" />;
  }

  if (errorMessage) {
    return (
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={() => setTimeout(() => setSnackbarOpen(false), 1000)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="outlined">{errorMessage}</Alert>
      </Snackbar>
    );
  }

  return (
    <>
      <ListScreenAppBar />

      <view
        style={{
          marginTop: 3,
          overflowX: "auto",
          display: "flex",
          width: "100vw",
          height: "100vh",
        }}
      >
        {listData.map((list) => (
          <ListCardContainer
            key={list.id}
            list={list}
            deleteListCallBack={() => deleteList(list.id)}
          ></ListCardContainer>
        ))}

        <Box
          sx={{
            backgroundColor: "lightgrey",
            cursor: "pointer",
            justifyContent: "center",
            minWidth: "300px",
            height: "fit-content",

            marginTop: 3,
            borderRadius: 2,
          }}
        >
          {addListInputVisibility ? (
            <FormInput
              inputKey={"addList"}
              inputValue={newListValue}
              handleChange={(e) => setNewListTitle(e)}
              onCrossCallback={toggleAddListInput}
              addButtonCallBack={addNewList}
              onSubmitCallback={addNewList}
            ></FormInput>
          ) : (
            <Box
              sx={{
                background: "white",
                padding: 2,
                borderRadius: 2,
                boxShadow: 1,
                cursor: "pointer",
              }}
            >
              <Typography variant="body2" onClick={toggleAddListInput}>
                + Add Another List
              </Typography>
            </Box>
          )}
        </Box>
      </view>
    </>
  );
}

export default ListScreen;
