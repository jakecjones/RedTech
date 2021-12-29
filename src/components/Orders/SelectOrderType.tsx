import { Component } from "react";
import { orderTypes } from "../../utils/constants";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Order type</InputLabel>
            <Select
            sx={{ color: "#000", width: '100%', }}
            labelId="demo-simple-select-label"
            label="Order type"
            onChange={this.upateOrderType}
            >
              {orderTypes.map(type => {
                return (<MenuItem value={type.key}>{type.displayText}</MenuItem>)
              })}
            </Select>
          </FormControl>

        )
    }
}

export default SelectOrderType;