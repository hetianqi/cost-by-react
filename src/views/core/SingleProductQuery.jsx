import React from 'react';
import PropTypes from 'prop-types';
import { 
	Row,
	Col,
	Card,
	Form,
	Input,
	Select,
	AutoComplete
} from 'antd';

const { Option } = Select;

class QueryForm extends React.Component {
	state = {
		itemList: []
	};

	onSelect() {

	}

	render() {
		const { getFieldDecorator } = this.props.form;
	
		return (
			<Form>
				<Row>
					<Col span={6}>
						<Form.Item label="计划类型" required>
							{
								getFieldDecorator('plan_type', {
									rules: [{ required: true, message: '计划类型必填' }]
								})(
									<Select>
										<Option value="年度计划">年度计划</Option>
										<Option value="季度计划">季度计划</Option>
										<Option value="月度计划">月度计划</Option>
										<Option value="临时计划">临时计划</Option>
										<Option value="临时测算">临时测算</Option>
									</Select>
								)
							}
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label="物品编码" required>
							{
								getFieldDecorator('item_no', {
									rules: [{ required: true, message: '物品编码必填' }]
								})(
									<AutoComplete
										dataSource={this.state.itemList}
										onSelect={this.onSelect}
										onSearch={this.handleSearch}
										placeholder="input here"
									/>
								)
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
	}
}

export default class SingleProductQuery extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			rightInfo: {
				tempCalc: false,
				reCalc: false
			}
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
				Form.create()(<QueryForm onChange={this.handleQueryFieldsChange} />)
			</Card>
		);
	}
}