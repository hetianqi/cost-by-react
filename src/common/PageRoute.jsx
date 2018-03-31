import React from 'react';
import { Route } from 'react-router-dom';
import SingleProductQuery from '../core/SingleProductQuery';

export default function PageRoute() {
	return (		
		<Route exact path="/" component={SingleProductQuery} />
	);
}