import { Component } from "react";

import Page from "../components/Page";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SelectOrderType from "../components/Orders/SelectOrderType";
import SelectCustomer from "../components/Orders/SelectCustomer";
import CreateView from "../components/Orders/CreateView";
import ListView from "../components/Orders/ListView";
import NoResults from "../components/Orders/NoResults";
import ToggleButton from "@mui/material/ToggleButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { orderTypes } from "../utils/constants";
import orderService from "../services/orders";

interface IState {
  searchTerm: string;
  customerName: string;
  orderType: string;
  orderTypeFilters: any;
  customerFilters: any;
  showFilters: boolean;
  filterChips: any;
  originalOrders?: any;
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
      searchTerm: "",
      showFilters: false,
      filterChips: [],
      customerName: "",
      orderType: "",
      orderTypeFilters: [],
      customerFilters: [],
      originalOrders: [],
      orders: [],
    };
  }

  async componentWillMount() {
    await this.fetchOrders();
  }

  fetchOrders = async (searchTerm?: string) => {
    try {
      let orders;
      let filteredOrders = [];

      orders = await orderService.get();

      let formattedOrders = this.formatOrders(orders, false);
      let originalOrders = await orderService.get();

      if (searchTerm && searchTerm.length) {
        formattedOrders = formattedOrders?.filter(
          (order: any) => order.orderId === parseInt(searchTerm)
        );
      }

      if (this.state.filterChips && this.state.filterChips.length) {
        for (let index = 0; index < formattedOrders.length; index++) {
          const element = formattedOrders[index];

          const isIncluded = this.state.filterChips.findIndex((chip: any) => {
            return (
              element.orderType === chip.value ||
              element.customerName === chip.value
            );
          });

          if (isIncluded >= 0) {
            filteredOrders.push(element);
          }
        }

        formattedOrders = filteredOrders;
      }

      this.setState({ orders: formattedOrders, originalOrders });
    } catch (error) {
      console.log(error);
    }
  };

  formatOrders = (orders: any, checkAll: boolean) => {
    return orders.map((order: any) => {
      return {
        ...order,
        isChecked: checkAll,
        formattedOrderType: orderTypes.find(
          (type) => type.key === order.orderType
        )?.displayText,
      };
    });
  };

  searchOrders = async (e: any) => {
    let searchTerm = "";

    if (e && e.target && e.target.value && e.target.value.length) {
      searchTerm = e.target.value;
    }

    this.fetchOrders(searchTerm);
  };

  handleSelectOrders = (checkAll: boolean) => {
    const formattedOrders = this.formatOrders(this.state.orders, checkAll);
    this.setState({ orders: formattedOrders });
  };
  handleSelectOrder = (orderId: any, e: any) => {
    let orders = this.state.orders;
    const orderIndex = this.state.orders?.findIndex(
      (order) => orderId === order.orderId
    );
    if (orders && orders.length && orderIndex !== undefined) {
      orders[orderIndex].isChecked = e.target.checked;
      this.setState({ orders });
    }
  };

  handleDeletedOrders = async () => {
    let deletedOrders: any[] = [];
    this.state.orders?.forEach((order) => {
      if (order.isChecked) {
        deletedOrders.push(order.orderId);
      }
    });

    if (deletedOrders?.length) {
      await orderService.deleteSelected(deletedOrders);
      this.fetchOrders();
    }
  };

  handleFilters = (filters?: any) => {
    let mergedFilters: any[] = [];
    let orderTypeFilters = [];
    let customerFilters = [];

    if (filters.type === "customerName") {
      mergedFilters = [...filters.items, ...this.state.orderTypeFilters];
      customerFilters = filters.items;
      orderTypeFilters = this.state.orderTypeFilters;
    }
    if (filters.type === "orderType") {
      mergedFilters = [...this.state.customerFilters, ...filters.items];
      orderTypeFilters = filters.items;
      customerFilters = this.state.customerFilters;
    }

    const filterChips = mergedFilters.map((item: any) => {
      const displayText = orderTypes.find((type) => type.key === item)
        ?.displayText
        ? orderTypes.find((type) => type.key === item)?.displayText
        : item;

      return {
        value: item,
        displayText,
        type: filters.type
      };
    });

    this.setState({ orderTypeFilters, customerFilters, filterChips });
    this.fetchOrders();
  };

  handleCreateOrder = async (orderType: string, customerName: string) => {
    await orderService.create({
      orderId: 0,
      orderType: orderType,
      customerName: customerName,
      createdDate: "",
      createdByUserName: "Jake Jones",
    });
    this.fetchOrders();
  };

  toggleFilters = () => {
    this.setState({ showFilters: !this.state.showFilters });
  };

  filterCount = () => {
    return this.state.filterChips.length;
  };

  removeFilter = (filter: any) => {
    let filterChips = this.state.filterChips;
    let customerFilters = this.state.customerFilters;
    let orderTypeFilters = this.state.orderTypeFilters;

    const filterChipIndex = filterChips.findIndex((item : any) => item.value === filter.value);
    const customerNameIndex = customerFilters.findIndex((item : any) => item === filter.value);
    const orderTypeIndex = orderTypeFilters.findIndex((item : any) => item === filter.value);

    filterChips.splice(filterChipIndex, 1);
    customerFilters.splice(customerNameIndex, 1);
    orderTypeFilters.splice(orderTypeIndex, 1);

    this.setState({ filterChips, customerFilters, orderTypeFilters })
    this.fetchOrders();
  };

  render() {
    return (
      <Page headerTitle={"Orders"}>
        <>
          <div className="orders">
            <div className="orders__headers">
              <div className="orders__action">
                <Paper
                  component="form"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: 1,
                    borderColor: "#ccc",
                    height: "60px",
                    px: 2
                  }}
                  elevation={0}
                >
                  <InputBase
                    sx={{ flex: 1 }}
                    placeholder="Search by Order ID"
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
              </div>
              <div className="orders__action">
                <ToggleButton
                  sx={{
                    height: "100%",
                    border: 1,
                    borderColor: "#ccc",
                  }}
                  value="check"
                  onClick={this.toggleFilters}
                  className="filter-button"
                >
                  {this.filterCount() ? (
                    <div className="filter-badge">{this.filterCount()} </div>
                  ) : (
                    <FilterListIcon sx={{ mr: 1 }} />
                  )}
                  Filters
                </ToggleButton>
              </div>
              <div className="orders__action">
                <CreateView createOrder={this.handleCreateOrder} />
              </div>
            </div>
            <div className="filter-chips">
              {this.state.filterChips.map((chip: any) => {
                return (
                  <div key={chip.value} className="filter-chips__chip status">
                    <div className="status__container">
                      {chip.displayText}
                      <IconButton
                        sx={{ ml: 1, p: 0 }}
                        onClick={() => this.removeFilter(chip)}
                        size={"large"}
                      >
                        <CloseIcon fontSize="small"/>
                      </IconButton>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className={`filters ${
                this.state.showFilters ? "filters-active" : ""
              }`}
            >
              <div className="filters__actions">
                <div className="filters__actions__action">
                  {this.state.originalOrders.length ? (
                    <SelectCustomer
                      originalOrders={this.state.originalOrders}
                      customerFilters={this.state.customerFilters}
                      selectCustomerType={this.handleFilters}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="filters__actions__action">
                  <SelectOrderType
                    orderTypeFilters={this.state.orderTypeFilters}
                    selectOrderType={this.handleFilters}
                  />
                </div>
              </div>
            </div>
            {this.state && this.state.orders && this.state.orders.length ? (
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
