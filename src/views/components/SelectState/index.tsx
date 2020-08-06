import React from 'react';
import ReactDOM from 'react-dom';

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
  labelWidth: number;
}

interface State {
  selectedState: number;
}

class SelectState extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      selectedState: 0,
    };
  }

  private inputLabelRef = React.createRef<InputLabel>();

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    this.setState({ selectedState: +value });
  };

  render() {
    const { classes, statesKeyValue, labelWidth } = this.props;
    const { selectedState } = this.state;
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={this.inputLabelRef} htmlFor="States">
          States
        </InputLabel>
        <Select
          value={selectedState}
          onChange={this.handleChange}
          input={
            <OutlinedInput name="states" labelWidth={labelWidth} id="States" />
          }
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
