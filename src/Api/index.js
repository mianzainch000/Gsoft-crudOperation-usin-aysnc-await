import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "react-bootstrap/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import styleApi from "./styleApi.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { ToastFunction } from "../Components/Toasttify";
export const Api = (props) => {
  // States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [updateId, setUpdateId] = useState("");
  // API URL

  const url =
    "https://6500433418c34dee0cd49c51.mockapi.io/ApiUsingCrudOperation";

  // Formik

  const formik = useFormik({
    initialValues: {
      fn: "",
      ln: "",
    },
    onSubmit: (values) => {
      updateId ? updateData(updateId, values) : postData(values);
      formik.handleReset();
    },
    validationSchema: Yup.object({
      fn: Yup.string().required("Enter First Name"),
      ln: Yup.string().required("Enter Last Name"),
    }),
  });

  useEffect(() => {
    fetchingData();
  }, []);

  // Function

  // Fetch Data Rorm Api

  const fetchingData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Data was not fetched from API", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  // Post Data From Api

  const postData = async (values) => {
    const header = { "Access-Control-Allow-Origin": "*" };
    const postData = {
      fn: values.fn,
      ln: values.ln,
      header,
    };

    try {
      const response = await axios.post(url, postData);
      setData([...data, response.data]);
      <ToastFunction />;
    } catch (error) {
      <ToastFunction />;
    }
  };

  // Delete Data

  const deleteData = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      setData(data.filter((resource) => resource.id !== id));
      toast.error("Data was deleted successfully ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Error Deleting", {
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

  // Edit Data

  const editData = (idUpdate, fn, ln) => {
    formik.setValues({ fn, ln });
    setUpdateId(idUpdate);
  };

  // updateData

  const updateData = async (id, values) => {
    try {
      const response = await axios.put(`${url}/${id}`, {
        fn: values.fn,
        ln: values.ln,
      });

      setData((prevData) =>
        prevData.map((state) =>
          state.id === response.data.id ? response.data : state
        )
      );
      // setData(data);
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

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Open Modal
      </Button>

      <>
        {loading ? (
          <Typography className={styleApi.spinner}>
            <CircularProgress sx={{ color: "red;" }} />
          </Typography>
        ) : (
          <>
            {/* DialogBox */}

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
              <DialogContent>
                <DialogContentText>
                  Are you sure wnat to delete this blog?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    deleteData(deleteId);
                    setDialogOpen(false);
                  }}
                  sx={{ color: "red;" }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            {/* Modal */}

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      autoFocus
                      name="fn"
                      value={formik.values.fn}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    {formik.touched.fn && formik.errors.fn ? (
                      <div className="error">{formik.errors.fn}</div>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      autoFocus
                      name="ln"
                      value={formik.values.ln}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    {formik.touched.ln && formik.errors.ln ? (
                      <div className="error">{formik.errors.ln}</div>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={handleClose}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>

            {/* Table */}

            <TableContainer component={Paper} sx={{ maxHeight: "500px;" }}>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <th>First Name</th>
                    </TableCell>
                    <TableCell>
                      <th>Last Name</th>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <IconButton>
                        <DeleteIcon sx={{ color: "red;", fontSize: "40px;" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <IconButton>
                        <EditIcon
                          sx={{ color: "yellow;", fontSize: "40px;" }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>
                        <td>{data.fn}</td>
                      </TableCell>
                      <TableCell>
                        <td>{data.ln}</td>
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          setDeleteId(data.id);
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            setDialogOpen(true);
                          }}
                        >
                          <DeleteIcon
                            sx={{ color: "red;", fontSize: "40px;" }}
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            editData(data.id, data.fn, data.ln);
                            handleShow();
                          }}
                        >
                          <EditIcon
                            sx={{ color: "yellow;", fontSize: "40px;" }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        <ToastContainer />
      </>
    </>
  );
};
