/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0';
import 'assets/css/demo.css';
import AuthLayout from 'layouts/Auth.js';
import AdminLayout from 'layouts/Admin.js';
import { ToastProvider } from 'react-toast-notifications';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<ToastProvider>
					<Route path='/auth' render={(props) => <AuthLayout {...props} />} />
					<Route path='/admin' render={(props) => <AdminLayout {...props} />} />
					<Redirect from='/' to='/auth/login-page' />
				</ToastProvider>
			</Switch>
		</BrowserRouter>
	</Provider>,	
	document.getElementById('root')
);
