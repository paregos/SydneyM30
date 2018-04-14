import React from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import Table, {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';


export default class BusTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  tick() {
  }

  render() {
    var timePlanned = this.props.rowData.departureTimePlanned;
    var timeEstiamted = this.props.rowData.departureTimeEstimated;

    if(timePlanned && timeEstiamted){
      return(
        <TableRow>
          <TableRowColumn> 
            <Moment>
              {timePlanned}
            </Moment>
          </TableRowColumn>
          <TableRowColumn> 
            <Moment>
              {timeEstiamted}
            </Moment>
          </TableRowColumn>
        </TableRow>
      );
    } else if (timePlanned){
      return(
        <TableRow>
          <TableRowColumn> 
            <Moment>
              {timePlanned}
            </Moment>
          </TableRowColumn>
        </TableRow>
      );
    } else {
      return(<TableRow></TableRow>);
    }
  }
}