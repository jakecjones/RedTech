import { Component } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface IProps {
  orders?: Array<{
    customerName?: string;
    createdByUserName?: string;
    createdDate?: string;
    orderId?: number;
    orderType?: string;
  }>;
}

class ListView extends Component<IProps, {}> {
  render() {
    return (
      <>
      { this.props && this.props.orders ? (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Order Type</TableCell>
              <TableCell>Customer</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.props.orders.map((row) => (
              <TableRow
                key={row.customerName}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>{row.orderId}</TableCell>
                <TableCell>{row.createdDate}</TableCell>
                <TableCell>{row.createdByUserName}</TableCell>
                <TableCell>{row.orderType}</TableCell>
                <TableCell>{row.customerName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      ) : ''}
      </>
    );
  }
}

export default ListView;
