/**
 * 入口文件
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PageLayout from './common/PageLayout.jsx';

import './app.less';

class App extends React.Component {
	render() {
		return (
			<PageLayout>
				
			</PageLayout>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('#app'));