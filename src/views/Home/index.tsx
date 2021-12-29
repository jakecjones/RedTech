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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ToggleButton from '@mui/material/ToggleButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuItem from '@mui/material/MenuItem';

import orderService from "../../services/orders";

interface IState {
  searchTerm: string,
  customerName: string,
  orderType: string,
  showFilters: boolean,
  originalOrders?: Array<{
    customerName?: string;
    createdByUserName?: string;
    createdDate?: string;
    orderId?: number;
    orderType?: string;
    isChecked?: boolean;
  }>,
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
        customerName: '',
        orderType: '',
        originalOrders: [],
        orders: []
    }
  }

  async componentWillMount() {
    this.fetchOrders();
  }

  fetchOrders = async () => {
    try {
      let orders;
      if (this.state.customerName || this.state.orderType) {
        orders = await orderService.query(this.state.customerName, this.state.orderType);
      } else {
        orders = await orderService.get();
      }

      let formattedOrders = this.formatOrders(orders, false);
      let originalOrders = await orderService.get();
      this.setState({ orders: formattedOrders, originalOrders });

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
        this.fetchOrders();
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

  handleDeletedOrders = async () => {
    let deletedOrders: any[] = [];
    this.state.orders?.forEach((order) => {
      if (order.isChecked) {
          deletedOrders.push(order.orderId)
      }
    })

    if (deletedOrders?.length) {
      await orderService.delete(deletedOrders);
      this.fetchOrders();
    }
  }

  handleSelectOrderType = (orderType: string) => {
    this.setState({orderType});
    this.fetchOrders();
  }

  handleCreateOrder = async (orderType: string, customerName: string) => {
    await orderService.create({
      orderId: 0,
      orderType: orderType,
      customerName: customerName,
      createdDate: "",
      createdByUserName: "Jake Jones",
    });
    this.fetchOrders();
  }

  customers = () => {
    let customers = [...new Set(this.state.originalOrders?.map(item => item.customerName))];
    let menu = [];
    for (let index = 0; index < customers.length; index++) {
      const element = customers[index];
      menu.push(<MenuItem value={element}>{element}</MenuItem>)
    }
    return menu;
  }

  updateSelectedCustomer = (e: any) => {
    this.setState({customerName: e.target.value})
    this.fetchOrders();
  }

  toggleFilters = () => {
    this.setState({showFilters: !this.state.showFilters});
  }

  filterCount = () => {
    let count = 0;

    if (this.state.customerName.length) {
      count = count + 1;
    }
    if (this.state.orderType.length) {
      count = count + 1;
    }
    return count;
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
                {this.filterCount() ? 
                <div className="filter-badge">{this.filterCount()} </div> : 
                <FilterListIcon sx={{mr: 1}}  />
                }
                Filters
              </ToggleButton>

              <CreateView createOrder={this.handleCreateOrder}/>

            </div>
            <div className={`filters ${this.state.showFilters ? 'filters-active' : ''}`}>
              <div className="filters__actions">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Customer name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Customer name"
                    onChange={this.updateSelectedCustomer}
                  >
                    <MenuItem value="" >None</MenuItem>
                    {this.customers()}
                  </Select>
                </FormControl>
                { this.state.customerName.length ?
                <SelectOrderType selectOrderType={this.handleSelectOrderType}/> : 
                ''
                }
              </div>
            </div>
            {this.state &&
            this.state.orders &&
            this.state.orders.length 
            ? (
              <ListView
                selectOrder={this.handleSelectOrder}
                selectAllOrders={this.handleSelectOrders}
                deleteSelectedOrders={this.handleDeletedOrders}
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
