import React from 'react';
import './styles/App.css';
import './styles/skeleton.css';
//import ReactDOM from "react-dom";
//import { Map, GoogleApiWrapper } from 'google-maps-react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: '',
            quantity: undefined,
            sum: 0
        };
    }
    handleNameChange = (e) => {
        const name = e.target.value;
        //console.log(e, name);
        this.setState({name});

    };
    handleQuantityChange = (e) => {
        const quantity = Number(e.target.value);
        this.setState({quantity});
        //console.log(quantity);
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        const postData = {
             country:'',
             users:''
         };
        
        function filteredByName(country){
            if(this.state.name === country.name){
               return ((postData.country = country.alpha3Code)&&(console.log(postData.country)))
            }
        };

        const countries = this.state.data;

        countries.filter(country => filteredByName)
            
        postData.users = this.state.quantity;
        console.log(postData);
        console.log(this.state.name);


        //const countriesRaw = this.state.data;
        //let countries = countriesRaw.map((country) => [country.name, country.latlng[0], country.latlng[1]]);
        // let countries = countriesRaw.map((country) => [country.name]);


         fetch('http://13.69.54.84:9000/llusers',{
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(postData)
         }).then(response => {
             console.log(response)
         }).catch(error =>{
             console.log(error)
         })               
                    

        this.setState((state) =>{
            return {sum: state.sum + state.quantity}
        });
    } 

    componentDidMount(){
        fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
                .then(json => this.setState({
                    data: json})
                )
                .catch(console.log);
    }

    countriesList() {
        //console.log(this.state);
        const countries = this.state.data;
        return (
            countries.map((country) =>
                <option key={country.alpha2Code} value={country.name}>
                    {country.name}
                </option>
            )
        );
    }

    render() {
        // console.log(this.state.data);


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
                        {this.countriesList()}
                    </select>
                    <label>Number of users in the country</label>
                    <input
                        onChange={this.handleQuantityChange}
                        name="quantity"
                        id="quantity"
                        className="u-full-width"
                        placeholder="--Enter the number of users--"
                        // value={this.state.quantity}
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