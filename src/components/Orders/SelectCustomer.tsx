import { Component } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

interface IProps {
  originalOrders: any;
  selectCustomerType: any;
  customerFilters: any;
}

interface IState {
  customerFilters: any;
}

class selectCustomerType extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      customerFilters: [],
    };
  }

  customers = () => {
    return [
      ...new Set(
        this.props.originalOrders?.map((item: any) => item.customerName)
      ),
    ];
  };

  upateCustomerType = (e: any) => {
    this.props.selectCustomerType({type: 'customerName', items: e.target.value});

  };

  render() {
    return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Order type</InputLabel>
        <Select
          sx={{ height: 50 }}
          label="Order type"
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={this.props.customerFilters}
          renderValue={(selected) => {
            return selected.map((select: string) => {
              return <span key={select} className="status-small">{select}</span>;
            });
          }}
          onChange={this.upateCustomerType}
        >
          {this.customers().map((item: any) => {
            return (
                <MenuItem key={item} value={item}>
                    <Checkbox checked={this.props.customerFilters.indexOf(item) > -1} />
                    {item}
                </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default selectCustomerType;
