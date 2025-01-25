import React from "react";
import { Box } from "@mui/material";
import Routes from "./container/routes";
import "./assets/scss/_global.scss"

const App = () => {
  return (
    <Box className="page-container">
      <Routes />
    </Box>
  )
}


export default App