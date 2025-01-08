import React from "react";
import { Container, Box } from "@mui/material";
import Routes from "./container/routes"

const App = () => {
  return (
    <Container>
      <Box className="page-container">
        <Routes />
      </Box>
    </Container>
  )
}


export default App