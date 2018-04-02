/**
 * 路由配置
 */

import React from 'react';
import { Route } from 'react-router-dom';
import SingleProductQuery from '../core/SingleProductQuery';

export default function PageRoute() {
	return (
		<React.Fragment>
			<Route exact path="/" component={SingleProductQuery} />
		</React.Fragment>		
	);
}