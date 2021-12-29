import { Component } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  deleteSelectedOrders?: any;
  selectAllOrders?: any;
  selectOrder?: any;
  orders?: Array<{
    customerName?: string;
    createdByUserName?: string;
    createdDate?: string;
    orderId?: number;
    orderType?: string;
    isChecked?: boolean;
  }>;
}

let allChecked = false;

class ListView extends Component<IProps, {}> {

  checkAll = (e: any) => {
    this.props.selectAllOrders(e.target.checked)
  }

  deleteSelected = (e: any) => {
    this.props.deleteSelectedOrders(e.target.checked)
  }

  selectOrder = (orderId: number, e: any) => {
    console.log(e, orderId)
  }

  showListActions = () => {
    const hasChecked =  this.props.orders?.some((order) => {
      return order.isChecked;
    })

    if (hasChecked) {
      return (
        <IconButton onClick={this.deleteSelected} aria-label="delete">
          <DeleteIcon sx={{color: '#777'}}/>
        </IconButton>
      )
    }
  }  

  render() {
    return (
      <>
      { this.props && this.props.orders ? (
      <TableContainer component={Paper} sx={{ mt: 2, border: 1, borderColor: "#ccc" }} elevation={0} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{width: 100}}>
                <div className={`orders__list-actions ${this.showListActions() ? 'orders__list-actions-active' : ''}`}>
                  <Checkbox
                    checkedIcon={<IndeterminateCheckBoxIcon />}
                    onChange={this.checkAll}
                    defaultChecked={allChecked}
                  />
                  {this.showListActions()}
                </div>
              </TableCell>
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
                key={row.orderId}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>
                  <Checkbox onChange={(e) => this.props.selectOrder(row.orderId, e)} checked={row.isChecked || false} />
                </TableCell>
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
