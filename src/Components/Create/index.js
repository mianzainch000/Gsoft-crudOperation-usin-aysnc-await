import React, { useState } from "react";
import formValidation from "./formValidation.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LayoutComp } from "../Layout";
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const Create = () => {
  // States + varaibles

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Api Url
  const url =
    "https://6500433418c34dee0cd49c51.mockapi.io/apiCrudFunctionality";

  // Password Icon Visibility Function

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // ConfirmPassword Icon Visibility Function

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const postData = async (values) => {
    const header = { "Access-Control-Allow-Origin": "*" };
    const postData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      number: values.number,
      password: values.password,
      header,
    };
    try {
      const response = await axios.post(url, postData);
      setData([...data, response.data]);
      toast.success("Data was post successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/read");
      }, 3000);
    } catch (error) {
      toast.error("Data was not post successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const UniqueEmail = async (value) => {
    try {
      const response = await axios.get(`${url}?email=${value}`);
      return !response.data.length;
    } catch (error) {
      console.error("Error checking email uniqueness:", error);
      return true;
    }
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, onSubmitprops) => {
      onSubmitprops.setSubmitting(false);
      postData(values);
      formik.handleReset();
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First Name is Required")
        .matches(/^[A-Za-z]+$/, "Only Alphabets are Allowed")
        .matches(/^[A-Z].*$/, "First Letter must be capital"),

      lastName: Yup.string()
        .required("Last Name is Required")
        .matches(/^[A-Za-z]+$/, "Only Alphabets are Allowed")
        .matches(/^[A-Z].*$/, "First Letter must be capital"),
      email: Yup.string()
        .required("Email is Required")
        .matches(/\S+@\S+\.\S+/, "Invalid Email")
        .test("is-unique", "Email is already in use", UniqueEmail),
      number: Yup.string().required("Phone Number is Required"),
      password: Yup.string()
        .password()
        .minLowercase("1", "at least one lowerCase")
        .minUppercase("1", "at least one uppperCase")
        .minSymbols("1", "at least one Symbol")
        .required("Enter Password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
  });

  return (
    <LayoutComp>
      <Box className={formValidation.container}>
        <Box
          className={formValidation.boxContainer}
          sx={{
            width: { lg: "50%", md: "50%", sm: "70%", xs: "100%;" },
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container lg={12} spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box className={formValidation.inputField}>
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    autoComplete="off"
                    type="text"
                    name="firstName"
                    sx={{ width: "100%" }}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>

                {formik.touched.firstName && formik.errors.firstName ? (
                  <Box className={formValidation.error}>
                    {formik.errors.firstName}
                  </Box>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box className={formValidation.inputField}>
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    autoComplete="off"
                    type="text"
                    name="lastName"
                    sx={{ width: "100%" }}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>

                {formik.touched.lastName && formik.errors.lastName ? (
                  <Box className={formValidation.error}>
                    {formik.errors.lastName}
                  </Box>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box className={formValidation.inputField}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    autoComplete="off"
                    type="Email"
                    name="email"
                    sx={{ width: "100%" }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                {formik.touched.email && formik.errors.email ? (
                  <Box className={formValidation.error}>
                    {formik.errors.email}
                  </Box>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box className={formValidation.inputField}>
                  <TextField
                    id="outlined-basic"
                    label="Number"
                    variant="outlined"
                    autoComplete="off"
                    type="number"
                    name="number"
                    sx={{ width: "100%" }}
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                {formik.touched.number && formik.errors.number ? (
                  <Box className={formValidation.error}>
                    {formik.errors.number}
                  </Box>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box className={formValidation.inputField}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                {formik.touched.password && formik.errors.password ? (
                  <Box className={formValidation.error}>
                    {formik.errors.password}
                  </Box>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box className={formValidation.inputField}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleToggleConfirmPasswordVisibility}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Box>
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <Box className={formValidation.error}>
                    {formik.errors.confirmPassword}
                  </Box>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box className={formValidation.inputField}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={
                      !formik.isValid ||
                      formik.values.firstName.length == 0 ||
                      formik.isSubmitting
                    }
                    className={formValidation.button}
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <ToastContainer />
    </LayoutComp>
  );
};
