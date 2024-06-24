import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllListsFromBoard } from "../data/getData/get_api_calls";
import ListScreenAppBar from "./components/appbars/ListScreenAppBar";
import { Typography, Box } from "@mui/material";
import { createNewList } from "../data/create/create_api_calls";
import FormInput from "./components/appbars/form/FormInput";
import { deleteListByListId } from "../data/delete/delete_api_calls";
import ListCardContainer from "./containers/CardContainer";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
function ListScreen() {
  let { boardId } = useParams();
  const [listData, setListData] = useState({});

  const [addListInputVisibility, setAddListInputVisibility] = useState(false);
  const [newListValue, setNewListValue] = useState("");
  const [loader, setLoader] = useState(true);

  const getLists = async () => {
    const response = await getAllListsFromBoard(boardId);
    if (response.error) {
      console.log(response.error);
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message={response.error}
        key={vertical + horizontal}
      />;

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
      console.log(response.error);
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
      console.log(response.error, "error deleting");
      return;
    }
    const listDataCopy = listData.filter((item) => item.id != listId);
    setListData(listDataCopy);
  };
  if (loader) {
    return <CircularProgress color="success" />;
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
