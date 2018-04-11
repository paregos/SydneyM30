import React from 'react'

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
    console.log("planned time is "+this.props);
    return (
      <tr>
        <td>{this.props.rowData.departureTimePlanned}}</td>
        <td>{this.props.rowData.departureTimeEstimated}</td>
      </tr>
    );
  }
}