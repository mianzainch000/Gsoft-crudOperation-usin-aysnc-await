import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Grid, Button, Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import formValidation from "../Create/formValidation.module.css";
import { LayoutComp } from "../Layout";
YupPassword(Yup);

export const UpdateData = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  // APi Url

  const url =
    "https://6500433418c34dee0cd49c51.mockapi.io/apiCrudFunctionality";
  const { id } = useParams();

  const fetchingData = async () => {
    const response = await axios.get(`${url}/${id}`);
    formik.setValues({
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      number: response.data.number,
    });
  };
  useEffect(() => {
    fetchingData();
  }, [id]);

  const Update = async (id, values) => {
    try {
      const response = await axios.put(`${url}/${id}`, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        number: values.number,
      });

      setData(response);

      toast.warning("Data was edit successfully", {
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
      toast.error("Data was not update", {
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

  // Formik

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      number: "",
    },
    onSubmit: (values, onSubmitprops) => {
      onSubmitprops.setSubmitting(false);
      console.log("zain", values);
      Update(id, values);

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
        .matches(/\S+@\S+\.\S+/, "Invalid Email"),
      number: Yup.string().required("Phone Number is Required"),
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
                    Update
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
