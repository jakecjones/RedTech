import { Component } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputBase from "@mui/material/InputBase";
import SelectOrderType from "../../components/SelectOrderType";
import orderService from "../../services/orders";

interface IState {
  customerName: string;
  isActive: boolean;
  orderType: string;
}

class CreateView extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isActive: false,
      orderType: "",
      customerName: "",
    };
  }

  toggleCreateView = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  createOrder = async () => {
    await orderService.create({
      orderId: 0,
      orderType: this.state.orderType,
      customerName: this.state.customerName,
      createdDate: "",
      createdByUserName: "Jake Jones",
    });
    this.toggleCreateView();
  };
  handleSelectOrderType = (orderType: string) => {
    this.setState({ orderType });
  };
  updateCustomerName = (e: any) => {
    this.setState({ customerName: e.target.value });
  };

  render() {
    return (
      <div>
        <Button
          sx={{ ml: 1, width: 200, height: 56 }}
          variant="contained"
          disableElevation
          onClick={this.toggleCreateView}
        >
          Create Order +
        </Button>
        <Dialog
          fullScreen={false}
          open={this.state.isActive}
          aria-labelledby="responsive-dialog-title"
          sx={{ p: 10 }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Create new order"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
              <InputBase
                sx={{
                  p: "10px",
                  display: "flex",
                  alignItems: "center",
                  width: 200,
                  border: 1,
                  borderColor: "#ccc",
                  borderRadius: 1,
                  mt: 3,
                  mb: 1,
                }}
                onChange={this.updateCustomerName}
                placeholder="Customer name"
                inputProps={{ "aria-label": "Customer name" }}
              />
              <SelectOrderType selectOrderType={this.handleSelectOrderType} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleCreateView} autoFocus>
              cancel
            </Button>
            <Button onClick={this.createOrder} variant="contained" autoFocus>
              save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CreateView;
