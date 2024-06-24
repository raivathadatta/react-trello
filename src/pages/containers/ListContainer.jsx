import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { deleteCheckList } from "../../data/delete/delete_api_calls";
import { getCheckItemByListId } from "../../data/getData/get_api_calls";
import { upDateCheckListStatus } from "../../data/update/update_api_calls";
import { createCheckItem } from "../../data/create/create_api_calls";
import FormInput from "../components/appbars/form/FormInput";

function ListContainer({ checkItemList, listId, cardId }) {
  const [list, setList] = useState(checkItemList);
  const [addListInputVisibility, setListInputVisibility] = useState(false);
  const [title, setTitle] = useState("");

  const handleToggle = async (checkListId, state) => {
    const status = state == "incomplete" ? "complete" : "incomplete";
    let response = await upDateCheckListStatus(
      cardId,
      listId,
      checkListId,
      status
    );
    if (response.error) {
      console.log(response.error);
      return;
    }
    
    const newList = list.map((item) => {
      if (item.id == response.data.id) {
        item.state = response.data.state;
        return item;
      }
      return item;
    });
    setList(newList);
  };

  const setCheckItemTitle = (event) => {
    setTitle(event.target.value);
  };

  const toggleAddListInput = () => {
    setListInputVisibility(!addListInputVisibility);
  };
  const addNewCheckList = async (event) => {
    event.preventDefault();
    let response = await createCheckItem(listId, title);
    if (response.error) {
      console.log(response.error);
      return;
    }
    setTitle("");
    setList([...list, response.data]);
    setListInputVisibility(!addListInputVisibility);
  };

  const deleteCheckItemList = async (checkItemId) => {
    let response = await deleteCheckList(checkItemId, listId);
    if (response.error) {
      console.log(response.error);
      return;
    }
    const newList = list.filter((checkItem) => checkItem.id != checkItemId);
    setList(newList);
  };

  const getCheckItemList = async () => {
    const response = await getCheckItemByListId(listId);
    if (response.error) {
      console.log(response.error, "error");
      return;
    }
    setList(response.data);
  };
  useEffect(() => {
    getCheckItemList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container sx={{ background: "white", boxShadow: 2, border:1 }}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          { list ? list.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                sx={{ margin: 2, border: 2 }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => deleteCheckItemList(value.id)}
                  >
                    <MdOutlineDelete />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  onClick={() => handleToggle(value.id, value.state)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value.state == "incomplete" ? false : true}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.name} />
                </ListItemButton>
              </ListItem>
            );
          }): ''}

          <Box>
            {addListInputVisibility ? (
              <FormInput
                inputKey={`${cardId}` + `${listId}` + `${125}`}
                inputValue={title}
                handleChange={(e) => setCheckItemTitle(e)}
                onCrossCallback={toggleAddListInput}
                addButtonCallBack={addNewCheckList}
                onSubmitCallback={addNewCheckList}
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
                  + Add Another checkItem
                </Typography>
              </Box>
            )}
          </Box>
        </List>
      </Container>
    </>
  );
}

export default ListContainer;
