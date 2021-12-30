import { Component } from "react";
import { orderTypes } from "../../utils/constants";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

interface IProps {
  selectOrderType: any;
  orderTypeFilters: any;
}

interface IState {
  orderTypeFilters: any
}

class SelectOrderType extends Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      orderTypeFilters: []
    }
  };

  upateOrderType = (e: any) => {
    this.props.selectOrderType({type: 'orderType', items: e.target.value});
  };

  render() {
    return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Order type</InputLabel>
        <Select
          sx={{height: "100%"}}
          label="Order type"
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={this.props.orderTypeFilters}
          renderValue={(selected) => {
            return (
              selected.map((select: string) => {
                return (
                  <span key={select} className="status-small">{select}</span>
                )
              })
            )
          }}
          onChange={this.upateOrderType}
        >
          {orderTypes.map((type) => {
            return (
                <MenuItem key={type.key} value={type.key}>
                  <Checkbox checked={this.props.orderTypeFilters.indexOf(type.key) > -1} />
                  {type.displayText}
                </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default SelectOrderType;
