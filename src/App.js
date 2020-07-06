import React, {Component} from 'react';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Routes from './Routes';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {ToastContainer, toast} from 'react-toastify';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

const browserHistory = createBrowserHistory();


export default class App extends Component {
    render() {

        return (

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ToastContainer/>
                <Router history={browserHistory}>
                    <Routes/>
                </Router>
            </MuiPickersUtilsProvider>

        );
    }
}
