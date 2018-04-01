import React from 'react';
import PropTypes from 'prop-types';
import { 
	Row,
	Col,
	Form,
	Input,
	Card
} from 'antd';

const QueryForm = Form.create({
	onFieldsChange(props, changedFields) {
		props.onChange(changedFields);
	},
	// mapPropsToFields(props) {
	// 	return {
	// 		username: Form.createFormField({
	// 			...props.username,
	// 			value: props.username.value,
	// 		}),
	// 	};
	// },
})(props => {
	const { getFieldDecorator } = props.form;
	
	return (
		<Form>
			<Row>
				<Col span={6}>
					<Form.Item label="计划类型" required>
						{
							getFieldDecorator('plan_type', {
								rules: [{ required: true, message: '计划类型必填' }]
							})(<Input />)
						}
					</Form.Item>
				</Col>
				<Col span={6}>
					<Form.Item label="物品编码" required>
						{
							getFieldDecorator('item_no', {
								rules: [{ required: true, message: '物品编码必填' }]
							})(<Input />)
						}
					</Form.Item>
				</Col>
				<Col span={6}>
					<Form.Item label="物品型号" required>
						{
							getFieldDecorator('item_no', {
								rules: [{ required: true, message: '物品型号必填' }]
							})(<Input />)
						}
					</Form.Item>
				</Col>
				<Col span={6}>
					<Form.Item label="物品编码" required>
						{
							getFieldDecorator('revision', {
								rules: [{ required: true, message: '硬件版本必填' }]
							})(<Input />)
						}
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
}); 

export default class SingleProductQuery extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			rightInfo: {
				tempCalc: false,
				reCalc: false
			},
			queryModel: {
				plan_type: '',
				effectivity_date: '',
				org_id: 81,
				item_no: '',
				item_cpxh: '',
				revision: '',
				order_by: ''
			},
		};

		this.handleQueryFieldsChange = this.handleQueryFieldsChange.bind(this);
	}

	static propTypes = {
		form: PropTypes.any
	};

	handleQueryFieldsChange(changedFields) {
		this.setState(({ queryModel }) => ({
			queryModel: { ...queryModel, ...changedFields }
		}));
		console.log(this.state.queryModel);
	}

	render() {

		return (
			<Card>
				<QueryForm onChange={this.handleQueryFieldsChange} />
			</Card>
		);
	}
}