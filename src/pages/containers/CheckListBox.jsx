import { Box,IconButton,Typography, } from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";

import ListContainer from "../containers/ListContainer";
export default function CheckListBox({item,checkItemList,cardId,deleteCallBack}) {
  return (
    <>
      <Box
        key={item.id}
        sx={{
          height: "fitContent",
          display: "stack",

          width: "400px",
          margin: 1,
          padding: 1,
          paddingBottom: 5,
          backgroundColor: "white",
          borderRadius: 1,
          boxShadow: 2,
          cursor: "pointer",
          border: "1px solid lightgrey",
          
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>{item.name}</Typography>
          <IconButton
            aria-label="delete"
            onClick={ deleteCallBack}
          >
            <MdOutlineDelete />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: "fitContent",
            width: "400px",
            background: "gray",
            border: 2
          }}
        >
          <ListContainer
            checkItemList={checkItemList}
            listId={item.id}
            cardId={cardId}
          ></ListContainer>
        </Box>
      </Box>
    </>
  );
}
