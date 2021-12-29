import { Component } from "react";
import { orderTypes } from "../../utils/constants";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface IProps {
    selectOrderType: any
}

class SelectOrderType extends Component<IProps, {}> {

    upateOrderType = (e: any) => {
        console.log(e.target.value);
        this.props.selectOrderType(e.target.value);
    }

    render() {
        return (
            <Select
            sx={{ color: "#000", width: 200 }}
            labelId="demo-simple-select-label"
            label="Name"
            onChange={this.upateOrderType}
          >
            {orderTypes.map(type => {
              return (<MenuItem value={type.key}>{type.displayText}</MenuItem>)
            })}
          </Select>
        )
    }
}

export default SelectOrderType;