import axios from "axios";
import Keys from "../../utils/keys";

async function upDateCheckListStatus(cardId, checkListId, checkItemId, status) {
  try {
    const response = await axios.put(
      `https://api.trello.com/1/cards/${cardId}/checklist/${checkListId}/checkItem/${checkItemId}/state?key=${Keys.key}&token=${Keys.token}&value=${status} `
    );
    return { data: response.data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

export { upDateCheckListStatus };
