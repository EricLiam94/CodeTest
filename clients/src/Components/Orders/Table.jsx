import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const OrderTable = ({ rows, sortItems }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Name</StyledTableCell>
            <StyledTableCell>Customer Company</StyledTableCell>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell>
              {" "}
              Order Date{" "}
              <ImportExportIcon
                style={{ margin: "auto" }}
                onClick={sortItems}
              />{" "}
            </StyledTableCell>
            <StyledTableCell>Delivered Amout</StyledTableCell>
            <StyledTableCell>Total Amout</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows ? rows.map((row) => <Row row={row} />) : "No item found"}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Row = ({ row }) => {
  const [company, setcompany] = useState(null);
  const [customer, setcustomer] = useState(null);
  useEffect(() => {
    fetch(`/api/customers?cid=${row["customer_id"]}`)
      .then((temp) => temp.json())
      .then((res) => {
        let info = res[0];
        setcustomer(info.name);
        setcompany(info["company_info"][0]["company_name"]);
      });
  }, []);

  return (
    <StyledTableRow key={row.id}>
      <StyledTableCell component="th" scope="row">
        {row["order_name"]}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {company}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {customer}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {new Date(row["created_at"]).toLocaleDateString()}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {row["price_per_unit"]
          ? (row["price_per_unit"] * row["delivered_quantity"]).toFixed(2)
          : "N/A"}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {row["price_per_unit"]
          ? (row["price_per_unit"] * row["quantity"]).toFixed(2)
          : "N/A"}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default OrderTable;
