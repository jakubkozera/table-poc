import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomeController } from './views/home'
import KendoGrid from './views/kendo/kendo';

class AppRoute extends Component {
	render() {
		return (
			<Router>
				<div className="container">
				<Switch>
					<Route exact path="/" component={HomeController} />
					<Route exact path="/kendo" component={KendoGrid} />
				</Switch>
				</div>
			</Router>
		)
	}
}
export default AppRoute