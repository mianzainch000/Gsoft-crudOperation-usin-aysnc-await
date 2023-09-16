import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Button from "react-bootstrap/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import styleApi from "./styleApi.module.css";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { LayoutComp } from "../Layout";
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
} from "@mui/material";

export const Read = () => {
  // states + varaiable

  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Api Url
  const url =
    "https://6500433418c34dee0cd49c51.mockapi.io/apiCrudFunctionality";

  // Data Fetching

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

  useEffect(() => {
    fetchingData();
  }, []);

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
  if (data.length === 0) {
    navigate("/");
  }

  return (
    <LayoutComp>
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
                className={styleApi.error}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {/* Table */}

          <TableContainer component={Paper} sx={{ maxHeight: "500px;" }}>
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {" "}
                    <Typography
                      sx={{
                        fontSize: "20px",
                        width: "100px",
                      }}
                    >
                      First Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography
                      sx={{
                        fontSize: "20px",
                        width: "100px",
                      }}
                    >
                      Last Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography
                      sx={{
                        fontSize: "20px",
                        width: "100px",
                      }}
                    >
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography
                      sx={{
                        fontSize: "20px",
                        width: "100px",
                      }}
                    >
                      Number
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography
                      sx={{
                        fontSize: "20px",
                        width: "100px",
                      }}
                    >
                      Password
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography
                      sx={{
                        fontSize: "20px",
                        width: "100px",
                      }}
                    >
                      View
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography
                      sx={{
                        fontSize: "20px",
                        width: "100px",
                      }}
                    >
                      Delete
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        width: "100px",
                      }}
                    >
                      Edit
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>
                      <td>{data.firstName}</td>
                    </TableCell>
                    <TableCell>
                      <td>{data.lastName}</td>
                    </TableCell>
                    <TableCell>
                      <td>{data.email}</td>
                    </TableCell>
                    <TableCell>
                      <td>{data.number}</td>
                    </TableCell>
                    <TableCell>
                      <td>{data.password}</td>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <NavLink to={`/view/${data.id}`}>
                          <RemoveRedEyeIcon
                            sx={{ color: "blue;", fontSize: "40px;" }}
                          />
                        </NavLink>
                      </Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setDeleteId(data.id);
                      }}
                    >
                      <Typography
                        onClick={() => {
                          setDialogOpen(true);
                        }}
                      >
                        <DeleteIcon sx={{ color: "red;", fontSize: "40px;" }} />
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <NavLink to={`/update/${data.id}`}>
                          <EditIcon
                            sx={{ color: "yellow;", fontSize: "40px;" }}
                          />
                        </NavLink>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <ToastContainer />
    </LayoutComp>
  );
};
