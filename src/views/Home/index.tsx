import { Component } from "react";

import Page from "../../components/Page";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ListView from "../../components/ListView";
import NoResults from "../../components/NoResults";

import orderService from "../../services/orders";

interface IState {
  searchTerm: string,
  orders?: Array<{
    customerName?: string;
    createdByUserName?: string;
    createdDate?: string;
    orderId?: number;
    orderType?: string;
    isChecked?: boolean;
  }>;
}

class Home extends Component<{}, IState> {
    constructor(props: any) {
      super(props);
      this.state = {
        searchTerm: '',
        orders: []
    }
  }

  async componentWillMount() {
    try {
      const orders = await orderService.get();

      let formattedOrders = orders.map((order: any) => {
        return {
          ...order,
          isChecked: false
        }
      })
      
      this.setState({ orders: formattedOrders });
    } catch (error) {
      console.log(error);
    }
  }

  searchOrders = async (e: any) => {
      if (e && e.target && e.target.value && e.target.value.length) {

        const orders = this.state.orders?.filter(order => order.orderId === parseInt(e.target.value));
        this.setState({ orders })
      }

      if (!e.target.value.length) {
        const orders = await orderService.get();
        this.setState({ orders })
      }

      
  }

  render() {
    return (
      <Page headerTitle={""}>
        <>
          <div className="orders">
            <div className="orders-headers">
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 300,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search by Order ID"
                  inputProps={{ "aria-label": "search google maps" }}
                  onChange={this.searchOrders}
                  defaultValue={this.state.searchTerm}
                />

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                  type="submit"
                  sx={{ p: "10px", color: "#db3534" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <Button sx={{ ml: 2, backgroundColor: "#db3534" }} variant="contained" disableElevation>
                Create Order +
              </Button>
            </div>
            {this.state &&
            this.state.orders &&
            this.state.orders.length 
            ? (
              <ListView orders={this.state.orders} />
            ) : (
              <NoResults />
            )}
          </div>
        </>
      </Page>
    );
  }
}

export default Home;
