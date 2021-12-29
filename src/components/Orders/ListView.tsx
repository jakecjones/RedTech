import { Component } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from '@mui/material/Card';

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
    formattedOrderType?: string
  }>;
}

let allChecked = false;

class ListView extends Component<IProps, {}> {
  checkAll = (e: any) => {
    this.props.selectAllOrders(e.target.checked);
  };

  deleteSelected = (e: any) => {
    this.props.deleteSelectedOrders(e.target.checked);
  };

  selectOrder = (orderId: number, e: any) => {
    console.log(e, orderId);
  };

  showListActions = () => {
    const hasChecked = this.props.orders?.some((order) => {
      return order.isChecked;
    });

    if (hasChecked) {
      return (
        <IconButton onClick={this.deleteSelected} aria-label="delete">
          <DeleteIcon sx={{ color: "#777" }} />
        </IconButton>
      );
    }
  };

  render() {
    return (
      <>
        {this.props && this.props.orders ? (
          <div className="orders-table">
            <div className="orders-table__desktop">
              <TableContainer
                component={Paper}
                sx={{ mt: 2 }}
                elevation={0}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead sx={{borderRadius: 5}} >
                    <TableRow sx={{backgroundColor: "#f9f9f9"}} >
                      <TableCell sx={{ width: 100 }}>
                        <div
                          className={`orders__list-actions ${
                            this.showListActions()
                              ? "orders__list-actions-active"
                              : ""
                          }`}
                        >
                          <Checkbox
                            checkedIcon={<IndeterminateCheckBoxIcon />}
                            onChange={this.checkAll}
                            defaultChecked={allChecked}
                          />
                          {this.showListActions()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="orders-table__header">
                          Order ID
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="orders-table__header">
                        Creation Date
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="orders-table__header">
                          Created By
                        </span>
                      </TableCell>
                      <TableCell>
                      <span className="orders-table__header">
                        Order Type
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="orders-table__header">
                          Customer
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {this.props.orders.map((row) => (
                      <TableRow
                        key={row.orderId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        selected={row.isChecked}
                      >
                        <TableCell>
                          <Checkbox
                            onChange={(e) =>
                              this.props.selectOrder(row.orderId, e)
                            }
                            checked={row.isChecked || false}
                          />
                        </TableCell>
                        <TableCell>
                          <span className="orders-table__order-id">
                            {row.orderId}
                          </span>
                        </TableCell>
                        <TableCell>{row.createdDate}</TableCell>
                        <TableCell>{row.createdByUserName}</TableCell>
                        <TableCell>
                          <span className="status">
                            {row.formattedOrderType}
                          </span>
                        </TableCell>
                        <TableCell>{row.customerName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="orders-table__mobile">
            {this.props.orders.map((row) => (
              <Card elevation={3} sx={{p: 5, my: 2}}>
                {row.customerName}
              </Card>
            ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default ListView;
