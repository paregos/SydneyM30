import React from 'react'
import BusTableRow from './BusTableRow'
import Table, {
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableHead
} from 'material-ui/Table';
import Moment from 'react-moment';
import 'moment-timezone';

export default class BusTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busData: [],
      isLoading: true,
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '700px',
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
     
    var url = window.location.href+"fetchBusData"

    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({ busData: data, isLoading: false }))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
    
  }

  componentWillUnmount() {
  }

  render() {

    const { busData } = this.state;
    const { isLoading } = this.state;

    var stopEvents = busData ? busData : {};

    console.log("is loading "+isLoading);

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
       <Table
          height={this.state.height}
          style={{ width: 1200 }}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The static departure time">Departure time planned</TableHeaderColumn>
              <TableHeaderColumn tooltip="The current estimated departure time based on bus GPS">Departure time estimated</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
          {stopEvents.map((event, i) => {
            var timePlanned = event.departureTimePlanned;
            var timeEstiamted = event.departureTimeEstimated;
            if(timePlanned && timeEstiamted){
              return (
                <TableRow key={i}>
                  <TableRowColumn>{i}</TableRowColumn>
                  <TableRowColumn> 
                    <Moment format="Do MMMM YYYY [ -- ] hh:mm a">
                        {timePlanned}
                    </Moment>
                  </TableRowColumn>
                  <TableRowColumn> 
                    <Moment format="Do MMMM YYYY [ -- ] hh:mm a">
                        {timeEstiamted}
                    </Moment>
                  </TableRowColumn>
                </TableRow>
              )
            } else if (timePlanned){
              return (
                <TableRow key={i}>
                  <TableRowColumn>{i}</TableRowColumn>
                  <TableRowColumn> 
                    <Moment format="Do MMMM YYYY [ -- ] hh:mm a">
                        {timePlanned}
                    </Moment>
                  </TableRowColumn>
                  <TableRowColumn>
                  </TableRowColumn>
                </TableRow>
              )
            }

          })}
          </TableBody>
        </Table>
      </div>
    );
  }
}