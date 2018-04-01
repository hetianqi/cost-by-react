import React from 'react';
import { 
	Row,
	Col,
	Form,
	Input,
	Card
} from 'antd';

export default class SingleProductQuery extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			
		};
	}

	render() {
		return (
			<Card>
				<Form>
					<Row>
						<Col span={6}>
							<Form.Item label="计划类型" required>
								<Input />
							</Form.Item>
						</Col>
						<Col span={6}>

						</Col>
						<Col span={6}>
						
						</Col>
						<Col span={6}>
						
						</Col>
					</Row>
				</Form>
			</Card>
		);
	}
}