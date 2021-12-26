import { Component } from "react";

import Page from "../../components/Page";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ListView from "../../components/ListView";

import orderService from "../../services/orders";

interface IState {
  isLoaded: boolean;
  orders?: Array<{
    customerName?: string;
    createdByUserName?: string;
    createdDate?: string;
    orderId?: number;
    orderType?: string;
  }>;
}

class Home extends Component<{}, IState> {
  //   constructor(props: any) {
  //     super(props);
  //     this.state = {
  //       orders: [
  //         {
  //           customerName: 'aspen'
  //         }
  //       ]
  //   }
  // }

  async componentWillMount() {
    try {
      const orders = await orderService.get();
      this.setState({ orders });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoaded: true });
    }
  }

  render() {
    return (
      <Page headerTitle={"Home"}>
        <>
          {this.state &&
          this.state.orders &&
          this.state.orders.length &&
          this.state.isLoaded ? (
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
                    placeholder="Search"
                    inputProps={{ "aria-label": "search google maps" }}
                  />

                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <IconButton
                    type="submit"
                    sx={{ p: "10px", color: "#1976d2" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
                <Button sx={{ ml: 2 }} variant="contained" disableElevation>
                  Create Order +
                </Button>
              </div>

              <ListView orders={this.state.orders}/>
            </div>
          ) : (
            ""
          )}
        </>
      </Page>
    );
  }
}

export default Home;