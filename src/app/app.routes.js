import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomeController } from './views/home'
import KendoGrid from './views/kendo/kendo';
import AgGrid from './views/aggird/aggrid';

class AppRoute extends Component {
	render() {
		return (
			<Router>
				<div className="container">
				<Switch>
					<Route exact path="/" component={HomeController} />
					<Route exact path="/kendo" component={KendoGrid} />
					<Route exact path="/aggrid" component={AgGrid} />
				</Switch>
				</div>
			</Router>
		)
	}
}
export default AppRoute