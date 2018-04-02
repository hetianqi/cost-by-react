/**
 * 入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PageLayout from './views/common/PageLayout';
import PageRoute from './views/common/PageRoute';

import './app.less';

document.cookie = '.maiputicket=3323F880C6133E361202CF916D6753511C290EC5E7C0ECBF13463D18510C222EC632E77109710A7D88762AB2445154CBC9600908DE59213E19A338FE372A6DAC9F321329530C0B059522461BB5B54F47E4C8E48E3C8360FC301A99EB';

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