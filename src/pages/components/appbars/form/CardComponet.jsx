import { Card, CardContent, Typography } from "@mui/material";
import FormInput from "./FormInput";
import { useEffect, useState } from "react";
import { getAllCardsFromListId } from "../../../../data/getData/get_api_calls";
import { deleteCardById } from "../../../../data/delete/delete_api_calls";
import { createCard } from "../../../../data/create/create_api_calls";
import CheckListDialogBox from "../dialogs/CheckItemListDialogBox";
import ErrorSnackbar from "../../snackbar/ErrorSnackBar";

function CardComponent({ listId }) {
  const [cardDetails, setCardDetails] = useState([]);
  const [cardTitle, setCardTitle] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (message) => {
    setErrorMessage({ message });
    setSnackbarOpen(true);
  };


  const getCards = async () => {
    const response = await getAllCardsFromListId(listId);
    if (response.error) {
      handleError(response.error);
      return;
    }
    setCardDetails(response.data);
  };

  useEffect(() => {
    getCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId]);

  const hideInput = () => {
    setCardTitle("");
    setIsVisible(false);
  };

  const handleChange = (event) => {
    setCardTitle(event.target.value);
  };

  const showAddCardInputFled = () => {
    setIsVisible(true);
  };

  const addNewCard = async (event) => {
    event.preventDefault();

    const response = await createCard(listId, cardTitle);
    if (response.error) {
      handleError(response.error);
      return;
    }
    setCardTitle("");
    setCardDetails([...cardDetails, response.data]);
  };

  const deleteCard = async (cardId) => {
    const response = await deleteCardById(cardId);
    if (response.error) {
      handleError(response.error);
      return;
    }

    const newCard = cardDetails.filter((card) => card.id != cardId);
    setCardDetails(newCard);
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
      {cardDetails.map((card) => {
        return (
          <Card key={card.id} sx={{ marginTop: 2, width: "280px" }}>
            <CheckListDialogBox
              deleteCardCallBack={() => deleteCard(card.id)}
              name={card.name}
              cardId={card.id}
            ></CheckListDialogBox>
          </Card>
        );
      })}
      {isVisible ? (
        <FormInput
          inputKey={listId}
          inputValue={cardTitle}
          handleChange={handleChange}
          onCrossCallback={hideInput}
          addButtonCallBack={(event) => addNewCard(event)}
          onSubmitCallback={(event) => addNewCard(event)}
        ></FormInput>
      ) : (
        <Card sx={{ marginTop: 2, backgroundColor: "white", width: "280px" }}>
          <CardContent
            sx={{ cursor: "pointer" }}
            onClick={showAddCardInputFled}
          >
            <Typography variant="body2">+ Add Card Box</Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default CardComponent;
