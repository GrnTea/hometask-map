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
    console.log('this.state.chartData',this.state.chartData);

    const chartPost = this.state.chartData;
    let countryMap = [];
    if (chartPost.length) {
      countryMap = chartPost
        //.forEach(_ => console.log(_))
        .filter(country => country.country && country.country.length === 3)
        .map(country => [country.country, country.users])

    }
    // country.country = undefined == null -> falsy
    // && => first false or last expr
    // || => first true or last expr
    // , => sequentatly returns expressions

    countryMap = [['Country', 'Popularity']].concat(countryMap);
    console.log('countryMap', countryMap);
    // diff forEach vs map (мутирующий и немутирующий метод)

    return(
      <div className="chart-container">
        <Chart
          width={'750px'}
          height={'450px'}
          chartType="GeoChart"
          data={countryMap}
            // ['Country', 'Popularity'],
            // ['BLR', 1000]
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
             