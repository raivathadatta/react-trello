import axios from "axios";
import Keys from "../../utils/keys";

async function deleteCardById(cardId) {
  try {
    const response = await axios.delete(
      `https://api.trello.com/1/cards/${cardId}?key=${Keys.key}&token=${Keys.token}`
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

async function deleteListByListId(listId) {
  try {
    const response = await axios.put(
      `https://api.trello.com/1/lists/${listId}/closed?key=${Keys.key}&token=${Keys.token}&value=true`
    );
    return { data: response, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

async function deleteCheckListById(checkListId) {
  try {
    const response = await axios.delete(
      `https://api.trello.com/1/checklists/${checkListId}?key=${Keys.key}&token=${Keys.token}`
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

async function deleteCheckList(idCheckItem, listId) {
 try {
   const response = await axios.delete(
      `https://api.trello.com/1/checklists/${listId}/checkItems/${idCheckItem}?key=${Keys.key}&token=${Keys.token}`
    );
    return { data: response.data, error: null };
  }catch (error) {
    return { data: null, error: error.message };
  }
}

export { deleteCardById, deleteListByListId, deleteCheckListById ,deleteCheckList};
