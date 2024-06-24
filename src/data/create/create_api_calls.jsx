import Keys from "../../utils/keys";
import axios from "axios";
async function createNewBoard(boardName) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/boards/?name=${boardName}&key=${Keys.key}&token=${Keys.token}`
    );
    return { data: response.data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}
async function createNewList(listName, boardId) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/lists?name=${listName}&idBoard=${boardId}&key=${Keys.key}&token=${Keys.token}`
    );
    return { data: response.data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

async function createCard(listId, cardTitle) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/cards?idList=${listId}&name=${cardTitle}&key=${Keys.key}&token=${Keys.token}`
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

async function createCheckList(cardId, checklistName) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/cards/${cardId}/checklists?name=${checklistName}&key=${Keys.key}&token=${Keys.token}`
    );
    return { data: response.data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

async function createCheckItem(listId, checkItemName) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/checklists/${listId}/checkItems?name=${checkItemName}&key=${Keys.key}&token=${Keys.token}`
    );
    return { data: response.data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

export {
  createNewBoard,
  createNewList,
  createCard,
  createCheckList,
  createCheckItem,
};
