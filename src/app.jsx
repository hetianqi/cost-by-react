/**
 * 入口文件
 */

/* eslint-disable */
import React from 'react';
/* eslint-enable */
import ReactDOM from 'react-dom';

function Child(props) {
	return props.children();
}

/* eslint-disable */
function App() {
/* eslint-enable */
	return (
		<Child>{
			() => {
				return 'Hello React';
			}	
		}</Child>
	);
}

ReactDOM.render(<App />, document.querySelector('#app'));