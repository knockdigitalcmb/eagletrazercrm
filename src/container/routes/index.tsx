import React from "react";
import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import Otp from "../pages/Otp";


const _Routes = () => {
    return (
        <Routes>
            <Route key='login' path="/" element={<Login />} />
            <Route key="otp" path="/otp" element={<Otp />} />
        </Routes>
    )
}

export default _Routes