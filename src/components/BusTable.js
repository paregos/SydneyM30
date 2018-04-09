import React from 'react'
import BusTableRow from './BusTableRow'

export default class BusTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busData: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    var url = "https://api.transport.nsw.gov.au/v1/tp/departure_mon?outputFormat=rapidJSON&coordOutputFormat=EPSG%3A4326&mode=direct&type_dm=stop&name_dm=200051&itdDate=20180408&itdTime=1710&departureMonitorMacro=true&TfNSWDM=true&version=10.2.1.42";
    var token = 'sXm3TGx8PqEc5lX6APrEM6ySbPjw0sSTYqHf';

    fetch(url, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'Authorization': 'apikey ' + token
      }
    })
    .then(response => response.json())
    .then(data => this.setState({ busData: data, isLoading: false }));
  }

  componentWillUnmount() {
  }

  render() {

    const { busData } = this.state;
    const { isLoading } = this.state;

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <tr>
          <th>businfo1</th>
          <th>businfo2</th> 
        </tr>
        <div>
          {busData}
        </div>
        {/* {busData.map((rowData, i) => {
            return (
                <BusTableRow rowData={rowData} />
            )
          })} */}
      </div>
    );
  }
}