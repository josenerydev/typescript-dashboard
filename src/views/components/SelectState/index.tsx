import React from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface Props {
  classes: any;
}

class SelectState extends React.Component<Props, {}> {
  render() {
    const { classes } = this.props;
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="state-label">States</InputLabel>
        <Select>
          <MenuItem></MenuItem>
        </Select>
      </FormControl>
    );
  }
}
