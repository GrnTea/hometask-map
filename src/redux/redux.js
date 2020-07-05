import '../styles/App.css';
import '../styles/skeleton.css';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const GOT_COUNTRIES = 'GOT_COUNTRIES';
export const ERR_COUNTRIES = 'ERR_COUNTRIES';
export const ADD_COUNTRY = 'SUBMIT';
export const ADD_TO_CHART = 'ADD_TO_CHART';

const initialState = {
	isFetching: false,
	hasError: false,
	countries: [],
    name: '',
    quantity: null,
    sum: 0,
    chart: [
	['Germany', 500],
  	['United States', 450]
    ]
};

function fetchCountriesPending(){
	return {
		type: FETCH_COUNTRIES
	}
}

function fetchCountriesSuccess(countries){
	return{
		type: GOT_COUNTRIES,
		countries: countries
	}
}

function fetchCountriesError(error){
	return{
		type: ERR_COUNTRIES,
		error: error
	}
}

function addCountryOnSubmit(name, quantity, sum){
	return{
		type: ADD_COUNTRY,
		name,	
		quantity,
		sum
	}
}

function addCountryToChart(name, quantity){
	return{
		type: ADD_TO_CHART,
		name,
		quantity
	}
}

export const counter = (state = initialState, action) => {
	console.log('action', action)
	switch(action.type) {
		case FETCH_COUNTRIES:
			return  {
	          ...state,
	          isFetching: true
   		 	};
		case GOT_COUNTRIES:
			return  {
				...state,
				countries: action.countries,
				isFetching: false
			};
		case ERR_COUNTRIES:
			return {
	          ...state,
	          isFetching: false,
	          hasError: true
	        };
		case ADD_COUNTRY:
			return  {
				...state,
				name: action.name,
				quantity: action.quantity,
				sum: action.quantity + state.sum
			};
		case ADD_TO_CHART:
			return {
				...state,
				name: action.name,
				quantity: action.quantity,
				chart: [...state.chart, [action.name, action.quantity]]
			}
		default:
			return state
	}
};

export const fetchCountries = () => {
	console.log('fetch');
	return dispatch => {
        dispatch(fetchCountriesPending()); 
		console.log('fetch2')
        fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
            .then(countries => {
            	console.log('fetchCountries response', countries.length);
            	dispatch(fetchCountriesSuccess(countries));
           	})
            .catch(error =>{
            	console.log('fetchCountries error', error);
            	dispatch(fetchCountriesError(error));
            });
	}
};

export const addCountry = (name, quantity, sum) => {
	return (dispatch) => {
		dispatch(addCountryOnSubmit(name, quantity, sum))
	}
}

export const addToChart = (name, quantity) =>{
	return (dispatch) => {
		dispatch(addCountryToChart(name, quantity))
	}
}

export const reducers = combineReducers({
	counter,
	routing: routerReducer,
});
	

// const store = createStore(
// 	counter, 
// 	initialState
// );
// export default store

