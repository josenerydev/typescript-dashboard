import React from 'react';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Store from '@material-ui/icons/Store';
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Update from '@material-ui/icons/Update';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import Accessibility from '@material-ui/icons/Accessibility';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
import CheckIcon from '@material-ui/icons/Check';
// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Table from '../../components/Table/Table';
import Tasks from '../../components/Tasks/Tasks';
import CustomTabs from '../../components/CustomTabs/CustomTabs';
import Danger from '../../components/Typography/Danger';
import Card from '../../components/Card/Card';
import Button from '../../components/CustomButtons/Button';
import CardHeader from '../../components/Card/CardHeader';
import CardIcon from '../../components/Card/CardIcon';
import CardBody from '../../components/Card/CardBody';
import CardFooter from '../../components/Card/CardFooter';

import { bugs, website, server } from '../../variables/general';

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from '../../variables/charts';

import dashboardStyle from '../../assets/jss/material-dashboard-react/views/dashboardStyle';
import CustomInput from '../../components/CustomInput/CustomInput';
import { InputLabel } from '@material-ui/core';
import Success from '../../components/Typography/Success';
import Axios from 'axios';

import CardDashboard from '../components/CardDashboard';
import SelectState from '../components/SelectState';

interface Props {
  classes: any;
}

interface State {
  value: number;
  creatingMessage: boolean;
  messageSuccess: boolean;
  messageFailed: boolean;
  statesData: StateData[];
  isLoading: boolean;
}

interface StateData {
  uid: number;
  uf: string;
  state: string;
  cases: number;
  deaths: number;
  suspects: number;
  refuses: number;
  datetime: string;
}

interface StatesResponseData {
  data: StateData[];
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
      creatingMessage: false,
      messageSuccess: true,
      messageFailed: true,
      isLoading: false,
      statesData: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }
  handleChange = (event: any, value: number) => {
    this.setState({ value });
  };

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  };

  async fetchStates() {
    this.setState({ isLoading: true });
    await Axios.get<StatesResponseData>(
      'https://covid19-brazil-api.now.sh/api/report/v1',
    )
      .then(response => {
        this.setState({ statesData: response.data.data });
        this.setState({ isLoading: false });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.fetchStates();
  }

  render() {
    const { classes } = this.props;
    const {
      creatingMessage,
      messageFailed,
      messageSuccess,
      statesData,
      isLoading,
    } = this.state;
    return (
      <div>
        <GridContainer>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <SelectState
              classes={classes}
              statesKeyValue={statesData.map(item => {
                return { id: item.uid, name: item.state };
              })}
            />
          )}

          <GridItem xs={12} sm={6} md={3}>
            <CardDashboard
              classes={classes}
              icon={<Store />}
              title="Cases"
              subtitle="Last 24 Hours"
              value={500}
              type="success"
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <CardDashboard
              classes={classes}
              icon={<Store />}
              title="Cases"
              subtitle="Last 24 Hours"
              value={500}
              type="success"
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <CardDashboard
              classes={classes}
              icon={<Icon>info_outline</Icon>}
              title="Cases"
              subtitle="Last 24 Hours"
              value={500}
              type="warning"
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <CardDashboard
              classes={classes}
              icon={<Store />}
              title="Cases"
              subtitle="Last 24 Hours"
              value={500}
              type="success"
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart={true}>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{' '}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart={true}>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart={true}>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart={true}>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: 'Bugs',
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  ),
                },
                {
                  tabName: 'Website',
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  ),
                },
                {
                  tabName: 'Server',
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  ),
                },
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={['ID', 'Name', 'Salary', 'Country']}
                  tableData={[
                    ['1', 'Dakota Rice', '$36,738', 'Niger'],
                    ['2', 'Minerva Hooper', '$23,789', 'Curaçao'],
                    ['3', 'Sage Rodriguez', '$56,142', 'Netherlands'],
                    ['4', 'Philip Chaney', '$38,735', 'Korea, South'],
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="success">
                <div className={classes.messages}>
                  <h4 className={classes.cardTitleWhite}>
                    Mensagens Positivas
                  </h4>
                  {!creatingMessage && (
                    <Button
                      color="transparent"
                      variant="outlined"
                      onClick={() => this.setState({ creatingMessage: true })}
                    >
                      Enviar Mensagem
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardBody>
                {!creatingMessage ? (
                  <React.Fragment>
                    <h5 className={classes.cardTitle}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras ac est pulvinar, tempor turpis id, vehicula magna.
                    </h5>
                    <p className={classes.cardCategory}>Jane Doe</p>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <GridContainer>
                      <GridItem xs={12}>
                        <CustomInput
                          labelText="Nome"
                          id="name"
                          color="success"
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12}>
                        <CustomInput
                          labelText="Mensagem"
                          id="message"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            multiline: true,
                            rows: 5,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </React.Fragment>
                )}
              </CardBody>
              {creatingMessage && (
                <CardFooter>
                  <Button
                    color="danger"
                    onClick={() => this.setState({ creatingMessage: false })}
                  >
                    Cancelar
                  </Button>
                  <Button color="success">Enviar Mensagem</Button>
                </CardFooter>
              )}
              {messageFailed && (
                <CardFooter>
                  <div className={classes.stats}>
                    <Danger>
                      <Warning />
                      Falha ao enviar mensagem
                    </Danger>
                  </div>
                </CardFooter>
              )}
              {messageSuccess && (
                <CardFooter>
                  <div className={classes.stats}>
                    <Success>
                      <CheckIcon />
                      Mensagem enviada com sucesso
                    </Success>
                  </div>
                </CardFooter>
              )}
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
