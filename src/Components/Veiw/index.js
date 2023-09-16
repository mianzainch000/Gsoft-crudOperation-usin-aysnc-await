import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import view from "./view.module.css";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LayoutComp } from "../Layout";
export const View = () => {
  // APi Url

  const url =
    "https://6500433418c34dee0cd49c51.mockapi.io/apiCrudFunctionality";
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const { firstName, lastName, email, number } = data;
  const fetchingData = async () => {
    const response = await axios.get(`${url}/${id}`);
    setData(response.data);
  };
  useEffect(() => {
    fetchingData();
  }, [id]);

  const backToReadTable = () => {
    navigate("/read");
  };
  return (
    <LayoutComp>
      <Box className={view.container}>
        <Box>
          <h2>FirstName</h2>
          <h4>{firstName}</h4>
          <h2>LastName</h2>
          <h4>{lastName}</h4>
          <h2>Email</h2>
          <h4>{email}</h4>
          <h2>Number</h2>
          <h4>{number}</h4>
        </Box>
      </Box>
    </LayoutComp>
  );
};
