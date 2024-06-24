import { Box, TextField, Button, Typography } from "@mui/material";

function FormInput({
  inputKey,
  inputValue,
  handleChange,
  onSubmitCallback,
  onCrossCallback,
  addButtonCallBack,
}) {
  const handleSubmitCallBack = (event) => {
    onSubmitCallback(event);
  };
  const handleCross = (event) => {
    onCrossCallback(event);
  };
  const buttonAdd = (event) => {
    addButtonCallBack(event);
  };

  return (
    <>
      <Box
        component="Form"
        sx={{
          marginTop: 3,
          boxShadow: 2,
          width: "280px",
          marginBottom: 3,
          borderRadius: 2,
          backgroundColor: "white",
          padding: "2%",
        }}
        onSubmit={handleSubmitCallBack}
      >
        <TextField
          key={inputKey}
          autoFocus
          variant="standard"
          value={inputValue}
          onChange={handleChange}
          placeholder="card title"
          InputProps={{ disableUnderline: true }}
          sx={{
            background: "white",
            outline: "none",
            borderRadius: 1,
          }}
        ></TextField>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box>
            <Button
              variant="contained"
              sx={{
                background: "primary.main",
                color: "white",
                textTransform: "none",
                borderRadius: 10,
                width: "100px",
              }}
              onClick={buttonAdd}
            >
              <Typography>Add </Typography>
            </Button>
          </Box>
          <Box>
            <Button
              onClick={handleCross}
              variant="text"
              sx={{
                color: "red",
                textTransform: "none",
                borderRadius: 1,
                padding: 1,
              }}
            >
              <Typography>x </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default FormInput;
