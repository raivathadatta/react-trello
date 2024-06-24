import Keys from "../../utils/keys";
import axios from "axios";

async function getAllListsFromBoard(boardId) {
  try {
    const response = await axios({
      // Endpoint to send files
      url: `https://api.trello.com/1/boards/${boardId}/lists?key=${Keys.key}&token=${Keys.token}`,
      method: "GET",
    });
    return { data: response.data, error: null };
  } catch (e) {
    return { data: null, error: e.message };
  }
}

const getBoards = async () => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/members/me/boards?key=${Keys.key}&token=${Keys.token}`
    );
    return { data: response.data, error: null };
  } catch (e) {
    return { data: null, error: e.message };
  }
};

async function getAllCardsFromListId(listId) {
  try {
    const response = await axios(
      `https://api.trello.com/1/lists/${listId}/cards?key=${Keys.key}&token=${Keys.token}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

async function getCheckList(cardId) {
  try {
    let response = await axios(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${Keys.key}&token=${Keys.token}`,
      {
        method: "GET",
      }
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

async function getCheckItemByListId(listId) {
  return axios.get(
    `https://api.trello.com/1/checklists/${listId}/checkItems?key=${Keys.key}&token=${Keys.token}`
  );
}

export {
  getAllCardsFromListId,
  getAllListsFromBoard,
  getBoards,
  getCheckList,
  getCheckItemByListId,
};
