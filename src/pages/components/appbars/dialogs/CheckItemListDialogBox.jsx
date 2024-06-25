import { MdOutlineDelete } from "react-icons/md";
import {
  IconButton,
  Box,
  Typography,
  Dialog,
  Container,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import {
  getCheckItemByListId,
  getCheckList,
} from "../../../../data/getData/get_api_calls";
import FormInput from "../form/FormInput";
import { deleteCheckListById } from "../../../../data/delete/delete_api_calls";
import { createCheckList } from "../../../../data/create/create_api_calls";
// import CheckListDialogBox from "../../../containers/CheckListBox";
import CheckListBox from "../../../containers/CheckListBox";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorSnackbar from "../../snackbar/ErrorSnackBar";

function CheckListDialogBox({ deleteCardCallBack, name, cardId }) {
  const [open, setOpen] = useState(false);
  const [checkList, setChecklist] = useState([]);
  const [isInputVisible, setInputVisibility] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [checkItems, setCheckItems] = useState([]);
  const [loading, setLoading] = useState(false);


  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (message) => {
    setErrorMessage({ message });
    setSnackbarOpen(true);
  };



  const onClickDeleteCard = () => {
    deleteCardCallBack();
  };

  const showDialogBox = () => {
    getCheckItemList();
  };
  const handleClose = () => {
    setOpen(false);
  };

  const toggleInput = () => {
    setInputVisibility(!isInputVisible);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setInputVisibility(!isInputVisible);
    const response = await createCheckList(cardId, inputValue);
    if (response.error) {
      handleError(response.error);
      return;
    }

    setChecklist([...checkList, response.data]);
  };
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const deleteCheckList = async (checklistId) => {
    const response = await deleteCheckListById(checklistId.id);
    if (response.error) {
      console.log(response.error, "error");
      return;
    }
    const newCheckList = checkList.filter(
      (checklist) => checklist.id != checklistId.id
    );
    setChecklist(newCheckList);
  };

  /// get checkList

  const getCheckItemList = async () => {
    setLoading(true);
    const response = getCheckList(cardId)
      .then((checklist) => {
        setChecklist(checklist.data);
        return checklist.data;
      })
      .then((data) => {
        getCheckListItems(data);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  //////////////// check items////////////////////////////
  const getCheckListItems = async (data) => {
    setOpen(true);
    let temp = data.reduce((acc, item) => {
      acc.push(getCheckItemByListId(item.id));
      return acc;
    }, []);

    const response = await Promise.all(temp);
    const checkItems = response.map((item) => item.data);
    setCheckItems(checkItems);
    setLoading(false);
  };
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
  
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            padding: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
          }}
          onClick={showDialogBox}
        >
          <Typography>{name}</Typography>
        </Box>
        <IconButton aria-label="delete" onClick={onClickDeleteCard}>
          <MdOutlineDelete />
        </IconButton>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Box>
            <Typography>{name}</Typography>
          </Box>
        </DialogTitle>

        <Container
          sx={{
            width: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "lightgrey",
            justifyItems: "center",
            padding: 1,
            borderRadius: 1,
            boxShadow: 2,
          }}
        >
          <Container sx={{ height: "700px" }}>
            {loading ? (
              <Box sx={{ height: "500px", marginTop: "40%" }}>
                <CircularProgress />
              </Box>
            ) : (
              checkList.map((item, index) => {
                return (
                  <CheckListBox
                    key={item.id}
                    item={item}
                    checkItemList={checkItems[index]}
                    deleteCallBack={() => deleteCheckList(item)}
                    cardId={cardId}
                  />
                );
              })
            )}
          </Container>

          {isInputVisible ? (
            <FormInput
              inputValue={inputValue}
              inputKey={cardId}
              onCrossCallback={toggleInput}
              addButtonCallBack={onSubmit}
              onSubmitCallback={onSubmit}
              handleChange={(event) => handleChange(event)}
            ></FormInput>
          ) : (
            <Box
              onClick={toggleInput}
              sx={{
                background: "white",
                padding: 2,
                borderRadius: 2,
                boxShadow: 1,
                cursor: "pointer",
              }}
            >
              <Typography variant="body2">+ Add Another List</Typography>
            </Box>
          )}
        </Container>
      </Dialog>
    </>
  );
}
export default CheckListDialogBox;
