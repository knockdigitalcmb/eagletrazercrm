import React from "react";
import { Route, Routes } from "react-router";
import Login from "../pages/Login";


const _Routes = () => {
    return (
        <Routes>
            <Route key='login' path="/" element={<Login />} />
        </Routes>
    )
}

export default _Routes