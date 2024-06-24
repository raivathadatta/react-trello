import {AppBar,Toolbar,Typography,Container} from '@mui/material'


function ListScreenAppBar(){
    return (
        <AppBar position="static" sx={{
            backgroundColor: 'gray',
            color: 'primary.contrastText',
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: 'primary.contrastText',
         
        }} >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 6,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 400,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Board
              </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    )
}

export default ListScreenAppBar