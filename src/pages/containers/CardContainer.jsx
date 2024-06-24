import { Container,Box,Typography,IconButton } from "@mui/material"
import CardComponent from "../components/appbars/form/CardComponet"
import { MdOutlineDelete } from "react-icons/md"

export default function ListCardContainer ({list,deleteListCallBack}){

    return (
        <>
           <Container
              key={list.id}
              sx={{
                background: "lightgray",
                width: "300px",
                display: "flex",
                flexDirection: "column",
                boxShadow: 4,
                borderRadius: 4,
                height: "fit-content",
                margin: 2,
                alignItems: "center",
                padding: 1,
                paddingBottom: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 1,
                }}
              >
                <Typography variant="h6">{list.name}</Typography>
                <IconButton
                  aria-label="delete"
                  onClick={ deleteListCallBack}
                >
                  <MdOutlineDelete />
                </IconButton>
              </Box>
              <CardComponent listId={list.id} />
            </Container>
        </>
    )

}