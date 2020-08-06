import React, { cloneElement } from 'react';
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/Card/CardHeader';
import CardIcon from '../../../components/Card/CardIcon';
import CardFooter from '../../../components/Card/CardFooter';

interface Props {
  classes: any;
  type: 'success' | 'danger' | 'warning' | 'info' | 'primary';
  icon: React.ReactElement;
  title: string;
  subtitle: string;
  value?: string | number;
}

class CardDashboard extends React.Component<Props, {}> {
  render() {
    const { classes, icon, type, title, subtitle, value } = this.props;
    return (
      <Card>
        <CardHeader color={type} stats={true} icon={true}>
          <CardIcon color={type}>{icon}</CardIcon>
          <p className={classes.cardCategory}>{title}</p>
          <h3 className={classes.cardTitle}>{value}</h3>
        </CardHeader>
        <CardFooter stats={true}>
          <div className={classes.stats}>{subtitle}</div>
        </CardFooter>
      </Card>
    );
  }
}

export default CardDashboard;
