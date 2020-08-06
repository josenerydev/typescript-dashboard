import React from 'react';

import Store from '@material-ui/icons/Store';
import Icon from '@material-ui/core/Icon';
import GridItem from '../../../components/Grid/GridItem';

import CardDashboard from '../CardDashboard';

interface Props {
  classes: any;
  infoState: {
    uid: number;
    uf: string;
    state: string;
    cases: number;
    deaths: number;
    suspects: number;
    refuses: number;
    datetime: string;
  };
}

class InfoState extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { classes, infoState } = this.props;
    return (
      <React.Fragment>
        <GridItem xs={12} sm={6} md={3}>
          <CardDashboard
            classes={classes}
            icon={<Store />}
            title="CASES"
            subtitle={infoState.datetime}
            value={infoState.cases}
            type="success"
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <CardDashboard
            classes={classes}
            icon={<Store />}
            title="DEATHS"
            subtitle="Last 24 Hours"
            value={infoState.deaths}
            type="success"
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <CardDashboard
            classes={classes}
            icon={<Icon>info_outline</Icon>}
            title="SUSPECTS"
            subtitle="Last 24 Hours"
            value={infoState.suspects}
            type="warning"
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <CardDashboard
            classes={classes}
            icon={<Store />}
            title="REFUSES"
            subtitle="Last 24 Hours"
            value={infoState.refuses}
            type="success"
          />
        </GridItem>
      </React.Fragment>
    );
  }
}

export default InfoState;
