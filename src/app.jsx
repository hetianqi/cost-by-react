/**
 * 入口文件
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PageLayout from './common/PageLayout';
import PageRoute from './common/PageRoute';

import './app.less';

class App extends React.Component {
	render() {
		return (
			<Router>
				<PageLayout main={<PageRoute />} nav="导航" />
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('#app'));