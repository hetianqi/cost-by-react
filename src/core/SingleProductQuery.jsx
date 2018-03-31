import React, { Fragment } from 'react';
import { 
	Row,
	Col,
	Form,
	Input
} from 'antd';

export default class SingleProductQuery extends React.Component {
	render() {
		return (
			<Fragment>
				<Form>
					<Row>
						<Col span={6}>
							<Form.Item label="计划类型" required>
								<Input />
							</Form.Item>
						</Col>
						<Col span={6}></Col>
						<Col span={6}></Col>
						<Col span={6}></Col>
					</Row>
				</Form>
			</Fragment>
		);
	}
}