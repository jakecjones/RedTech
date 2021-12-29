import { Component } from "react";

import Page from "../../components/Page";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SelectOrderType from "../../components/SelectOrderType";
import CreateView from "../../components/CreateView";
import ListView from "../../components/ListView";
import NoResults from "../../components/NoResults";
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import FilterListIcon from '@mui/icons-material/FilterList';

import orderService from "../../services/orders";

interface IState {
  searchTerm: string,
  orderType: string,
  showFilters: boolean,
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
        showFilters: false,
        orderType: '',
        orders: []
    }
  }

  async componentWillMount() {
    try {
      const orders = await orderService.get();

      let formattedOrders = this.formatOrders(orders, false);
      this.setState({ orders: formattedOrders });

    } catch (error) {
      console.log(error);
    }
  }

  formatOrders = (orders: any, checkAll: boolean) => {
    return orders.map((order: any) => {
      return {
        ...order,
        isChecked: checkAll
      }
    })
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

  handleSelectOrders = (checkAll: boolean) => {
      const formattedOrders = this.formatOrders(this.state.orders, checkAll);
      this.setState({ orders: formattedOrders });
  }
  handleSelectOrder = (orderId: any, e: any) => {
    let orders = this.state.orders;
    const orderIndex = this.state.orders?.findIndex(order => orderId === order.orderId);
    if (orders && orders.length && orderIndex !== undefined ) {
      orders[orderIndex].isChecked = e.target.checked;
      this.setState({ orders })
    }
  }

  handleSelectOrderType = () => {
    console.log('TODO')
  }

  toggleFilters = () => {
    this.setState({showFilters: !this.state.showFilters});
  }

  render() {
    return (
      <Page headerTitle={"Orders"}>
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
                  border: 1,
                  borderColor: "#ccc"
                }}
                elevation={0}
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
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <ToggleButton
                sx={{
                  ml: 1,
                  border: 1,
                  borderColor: "#ccc",
                }}
                value="check"
                onClick={this.toggleFilters}
              >
                <FilterListIcon sx={{mr: 1}}  />
                Filters
              </ToggleButton>

              <CreateView/>

            </div>
            <div className={`filters ${this.state.showFilters ? 'filters-active' : ''}`}>
            <Select
                sx={{ mr: 1, ml: 1, color: "#000", width: 200 }}
                labelId="demo-simple-select-label"
                label="Name"
              />
              <SelectOrderType selectOrderType={this.handleSelectOrderType}/>
            </div>
            {this.state &&
            this.state.orders &&
            this.state.orders.length 
            ? (
              <ListView
                selectOrder={this.handleSelectOrder}
                selectAllOrders={this.handleSelectOrders}
                orders={this.state.orders}
              />
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
