import { Component } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/Add";
import { orderTypes } from "../../utils/constants";

interface IProps {
  createOrder: any;
}

interface IState {
  customerName: string;
  isActive: boolean;
  orderType: string;
}

class CreateView extends Component<IProps, IState> {
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
    this.props.createOrder(this.state.orderType, this.state.customerName);
    this.toggleCreateView();
  };
  handleSelectOrderType = (e: any) => {
    this.setState({ orderType: e.target.value });
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
          Create Order
          <AddIcon sx={{ ml: 2 }} />
        </Button>
        <Dialog
          fullScreen={false}
          open={this.state.isActive}
          aria-labelledby="responsive-dialog-title"
          sx={{ p: 10 }}
          onBackdropClick={this.toggleCreateView}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Create new order"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Track all orders here and easily identify shipments that are
              running behind.
              <div className="mb-1">
                <InputBase
                  sx={{
                    p: "10px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    border: 1,
                    borderColor: "#ccc",
                    borderRadius: 1,
                  }}
                  onChange={this.updateCustomerName}
                  placeholder="Customer name"
                  inputProps={{ "aria-label": "Customer name" }}
                />
              </div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Order type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Order type"
                  onChange={this.handleSelectOrderType}
                >
                  {orderTypes.map((type) => {
                    return (
                      <MenuItem key={type.key} value={type.key}>
                        {type.displayText}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
