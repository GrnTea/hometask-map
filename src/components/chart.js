import React from "react";
import Chart from "react-google-charts";
import '../styles/App.css';

class ChartContainer extends React.Component{
  constructor(props) {
        super(props);
        this.state = {
          chartData: []
        }
  }

  componentDidMount(){
      fetch('http://13.69.54.84:9000/users')
              .then(res => res.json())
                  .then(json => this.setState({
                      chartData: json})
                  )
                  .catch(console.log);
  };

  render(){
    console.log(this.state.chartData);

    const chartPost = this.state.chartData;
    let countryMap = chartPost.map(country => [country.country, country.users]);

    console.log('countryMap', countryMap);
    //countryMap = [['Country', 'Amount']].concat(countryMap);

    const countriesFiltered = [];

    function filterMockingData(country){
      if(country.country.length == 3){
        return countriesFiltered.push(country)&&(console.log('from filter', country[0]))
      }
    }

    countryMap.filter(country => filterMockingData);

    console.log(countryMap);
    console.log(countriesFiltered);

    return(
      <div className="chart-container">
        <Chart
          width={'750px'}
          height={'450px'}
          chartType="GeoChart"
          data={
            // ['Country', 'Popularity'],
            //     ['BLR', 1000],
                countryMap}
          mapsApiKey='AIzaSyC83vznz3gUClEydE5rCLTUyGOFQxRNbl8'
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    )
  }
} 

export default ChartContainer;
// countryMap = [['Country', 'Amount']].concat(countryMap);

// ['Country', 'Popularity'],
            // ['AFG', 1000],
            // ['Germany', 10],
            // ['United States', 300],
            // ['Brazil', 400],
            // ['Canada', 500],
            // ['France', 600],
            // ['BLR', 300],
            // ['CA', 1000],
            // ['Russian Federation', 1500],
            // ['BY', 2000],
            // ['RU', 700]                    
             