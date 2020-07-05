import React from 'react';
import {connect} from 'react-redux';
import '../styles/App.css';
import '../styles/skeleton.css';
import {fetchCountries, addCountry, addToChart} from '../redux/redux.js';
//import {store} from '../store.js'; 

// onbeforeunload = function(){
//         localStorage.setItem('name', '12');
//     };

class Form extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     data: [],
        //     name: '',
        //     quantity: undefined,
        //     sum: 0
        // };
        this.selectbox = React.createRef();
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

    handleSubmit = (e) => {
        console.log('selectbox', this.selectbox.value);
        e.preventDefault();

        // if(this.props.name === '' & undefined & null){
        //     console.log('Choose the country!')
        // };
        console.log('selectbox', this.selectbox.value);

        if (this.selectbox.value == '') {
        }


        // const select = document.getElementById("select");
        // select.addEventListener("input", function (e) {
        //     if (select.validity.valueMissing) {
        //         select.setCustomValidity("Choose a country!");
        //         select.reportValidity();
        //     } else {
        //     select.setCustomValidity("");
        //     select.reportValidity();
        //   }
        // });

        
        this.props.addCountry(this.state.name, this.state.quantity, this.state.sum);
        ///const chartItem =[this.state.name, this.state.quantity];

        this.props.addToChart(this.state.name, this.state.quantity);
       // this.setState((state) => {
        //     return {sum: state.sum + state.quantity}
        // });


        const liMaker = text => {
            const li = document.createElement('li');
            const list = document.getElementById('list');
            //const button = document.getElementById('button');
            li.textContent = text
            list.appendChild(li)
        }
        //localStorage.clear();
        const storageArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
        storageArray.push([this.state.name, this.state.quantity]);
        localStorage.setItem('items', JSON.stringify(storageArray));

        liMaker(this.state.name + ' ' + this.state.quantity);

        //localStorage.clear();
    };

    componentDidMount(){
        this.props.fetchCountries();
    }

    // was: const countries = this.state.data;
    // better: const countries = this.props.countries

    countriesList() {
        let { countries } = this.props;
        countries = countries.length ? countries : []
        console.log('this.props', this.props);
        return (
            countries.map((country) =>
                <option key={country.alpha2Code} value={country.name}>
                    {country.name}
                </option>
            )
        );
    }
////
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="country-form">
                <div className="sum">
                    <h3>Total users: {this.props.sum} </h3>
                </div>
                <div>
                    <label>Country</label>
                    <select
                        onChange={this.handleNameChange}
                        name="country"
                        ref={this.selectbox}
                        className="u-full-width selectbox"
                    >
                        <option value="">--Select a country--</option>
                        {this.countriesList()}
                    </select>
                    <label>Number of users in the country</label>
                    <input
                        type="number"
                        onChange={this.handleQuantityChange}
                        name="quantity"
                        id="quantity"
                        className="u-full-width"
                        placeholder="--Enter the number of users--"
                        // value={this.state.quantity}
                        required
                    />
                    <input
                        className="button-primary "
                        id="button"
                        type="submit"
                        value="Submit"
                    />
                    <ul id="list">
                    </ul>     
                </div>
            </form>
        );
    }
}
///
//export default Form;

const mapStateToProps = state  => ({
    countries: state.counter.countries,
    sum: state.counter.sum,
    chart: state.counter.chart
})

const mapDispatchToProps = {
    addToChart,
    addCountry,
    fetchCountries
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)
