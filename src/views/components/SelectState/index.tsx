import React from 'react';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@material-ui/core';

interface Props {
  classes: any;
  statesKeyValue: {
    id: number;
    name: string;
  }[];
}

interface State {
  selectedState: number;
}

class SelectState extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedState: 0,
    };
  }

  handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    console.log(value);
  }

  render() {
    const { classes, statesKeyValue } = this.props;
    const { selectedState } = this.state;
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>States</InputLabel>
        <Select
          value={selectedState}
          onChange={this.handleChange}
          input={<OutlinedInput name="states" labelWidth={500} id="" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {statesKeyValue.map((item, index) => {
            return (
              <MenuItem value={item.id} key={index}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default SelectState;
