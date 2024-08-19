import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../Contexs/ShopContext";

const columns = [
  { id: "name", label: "Name", minWidth: 70, align:'start' },
  { id: "quantity", label: "Quant", minWidth: 70, align: "start" },
  { id: "price", label: "Price", minWidth: 70, align: "start" },
  { id: "totalAmount", label: "Total Amount", minWidth: 70, align: "start" },
  { id: "status", label: "Status", minWidth: 70, align: "start" },
];

export default function Order() {
  const url = "https://mern-stack-e-commerce-50uh.onrender.com";
  const { all_product } = useContext(ShopContext);
  const [doneOrder, setDoneOrder] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const createData = (name, quantity, price, totalAmount, status) => {
    return {
      name,
      quantity,
      price,
      totalAmount,
      status,
    };
  };

  useEffect(() => {
    const fetchDoneOrder = async () => {
      try {
        const res = await axios.get(`${url}/cart/getdone`, {
          headers: { "auth-token": `${localStorage.getItem("token")}` },
        });
        const orders = res.data;

        const processedRows = orders.map((order) => {
          const productDetails = all_product.find(
            (item) => item._id === order.product_id
          );

          if (productDetails) {
            const totalAmount = productDetails.price * order.quantity;
            return createData(
              productDetails.name,
              order.quantity,
              productDetails.price,
              totalAmount,
              'Done'
            );
          }

          return null;
        });

        setRows(processedRows);
        setDoneOrder(orders);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDoneOrder();
  }, [url, all_product]);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container>
      <h1 style={{ fontSize: "24px", marginTop: "30px" }}>Your Done Order</h1>
      <Paper
        sx={{
          width: "100%",
          marginTop: "30px",
          marginBottom: "80px",
          overflow: "hidden",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
