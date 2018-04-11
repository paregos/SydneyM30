import React from 'react'
import BusTableRow from './BusTableRow'

export default class BusTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busData: [],
      isLoading: true
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
    console.log(stopEvents)

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    console.log(stopEvents)

    return (
      <div>
        <tr>
          <th>Departure time planned</th>
          <th>Departure time estimated</th> 
        </tr>
        <div>
          {busData.version}
        </div>
        {stopEvents.map((event, i) => {
            return (
                <BusTableRow rowData={event} />
            )
          })}
      </div>
    );
  }
}