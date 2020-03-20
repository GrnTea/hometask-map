import React from 'react';
import './styles/App.css';
import './styles/skeleton.css';
//import ReactDOM from "react-dom";
//import { Map, GoogleApiWrapper } from 'google-maps-react';

//fetch the names of the countries//
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: '',
            quantity: '',
            lat: '',
            lng: '',
            sum: 0
        };
    }
    handleNameChange = (e) => {
        const name = e.target.value;
        this.setState({name: name});
        //console.log(name);
    };
    handleQuantityChange = (e) => {
        const quantity = Number(e.target.value);
        this.setState({quantity: quantity});
        //console.log(quantity);
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        const countries = this.state.data;
        console.log(countries);

        var countriesArray = [];
        for(var i=0; i<countries.length; i++){
            countriesArray.push([countries[i].name, countries[i].latlng[0], countries[i].latlng[1]]);
        }
        console.log(countriesArray);


        for(var j=0; j<countriesArray.length; j++){
            if(this.state.name === countriesArray[j][0]){
                console.log(countriesArray[j][0]+' '+countriesArray[j][1]+' '+countriesArray[j][2]);
                this.setState({
                    lat: countriesArray[j][1],
                    lng: countriesArray[j][2]})


                fetch('http://13.69.54.84:9000/llusers',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        country:'',
                        users:'',
                    })
                }).then(response => {
                    console.log(response)
                }).catch(error =>{
                        console.log(error)
                })
            }
        }

        this.setState((state) =>{
            return {sum: state.sum + state.quantity}
        });
    };

    componentDidMount() {
        // fetch(`https://maps.googleapis.com/maps/api/js?key=AIzaSyC83vznz3gUClEydE5rCLTUyGOFQxRNbl8&callback=initMap`)
        // fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`)
        //<script src="https://maps.googleapis.com/maps/api/js?language=ru&amp;key=AIzaSyBrokbs-nVSf7IWlbEFfgaWDWxzet-_sKs"></script>
        fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
                .then(json => this.setState({
                    data: json })
                )
                .catch(console.log);

    }
    render() {

        const countries = this.state.data;

        const select = document.getElementById('select');

        countries.forEach(country=>{
            const option = document.createElement('option');
            const optionValue = option.value;

            option.appendChild(document.createTextNode(country.name));
            select.appendChild(option);
        });

        const quantity = document.getElementById('quantity');

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="sum">
                    <h3>Total users: {this.state.sum} </h3>
                </div>
                <div>
                    <label>Country</label>
                    <select
                        onChange={this.handleNameChange}
                        name="country"
                        id="select"
                        className="u-full-width" >
                        <option value="">--Select a country--</option>
                    </select>
                    <label>Number of users in the country</label>
                    <input
                        onChange={this.handleQuantityChange}
                        name="quantity"
                        id="quantity"
                        className="u-full-width"
                        placeholder="--Enter the number of users--"
                        value={this.state.quantity}
                    />
                    <input
                        className="button-primary u-full-width"
                        type="submit"
                        value="Submit"
                         />

                </div>
            </form>
        );
    }
}
export default Form;


//const {country} = this.state;
