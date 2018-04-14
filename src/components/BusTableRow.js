import React from 'react'
import Moment from 'react-moment';
import 'moment-timezone';

export default class BusTable extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  tick() {
  }

  render() {
    console.log("planned time is "+this.props.rowData.departureTimePlanned);
    var timePlanned = this.props.rowData.departureTimePlanned;
    var timeEstiamted = this.props.rowData.departureTimeEstimated;

    if(timePlanned && timeEstiamted){
      return(
        <tr>
          <td> 
            <Moment>
              {timePlanned}
            </Moment>
          </td>
          <td> 
            <Moment>
              {timeEstiamted}
            </Moment>
          </td>
        </tr>
      );
    } else if (timePlanned){
      return(
        <tr>
          <td> 
            <Moment>
              {timePlanned}
            </Moment>
          </td>
        </tr>
      );
    } else {
      return(<tr></tr>);
    }
  }
}