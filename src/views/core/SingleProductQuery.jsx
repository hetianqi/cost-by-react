import React from 'react';
import { 
	Row,
	Col,
	Card,
	Form,
	Select,
	AutoComplete,
	Button,
	Table,
	message
} from 'antd';
import http from '../../lib/http';
import { formatMSDate } from '../../lib/util';

const { Option } = Select;

const QueryForm = Form.create()(class QueryForm extends React.Component {
	state = {
		queryModel: {
			item_no: '',
			item_cpxh: '',
			revision: ''
		},
		itemList: [],
		revisionList: [],
		effectivityDateList: [],
		batchInfo: {
			item_type: '',
			num_make_batch: '',
			num_ship_batch: ''
		}
	};

	formLayout = {
		sm: 24,
		lg: 6
	};

	constructor(props) {
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.getEffectivityDateByPlanType = this.getEffectivityDateByPlanType.bind(this);
		this.handleQuery = this.handleQuery.bind(this);
	}

	handleSelect(value, { props }) {
		this.setState((prevState) => ({
			queryModel: {
				...prevState.queryModel,
				item_no: props.itemNo,
				item_cpxh: props.itemCpxh
			}
		}));
		this.getRevisionList(props.itemNo);
	}

	handleSearch(type, value) {
		if (!value) {
			this.setState((prevState) => ({
				queryModel: {
					...prevState.queryModel,
					item_no: '',
					item_cpxh: '',
					revision: ''
				},
				revisionList: []
			}));
		}
		this.setState({ itemList: [] });
		if (!value || value.length < 2) return;
		http('Core/GetItemList', {
			params: { 
				org_id: 81,
				[type]: value
			}
		})
			.then(({ data }) => {
				if (data.State) {
					this.setState({ itemList: data.Data.slice(0, 20) });
				}
			});   
	}

	// 获取硬件版本列表
	getRevisionList(item_no) {
		http.get('Core/GetItemRevisions', {
			params: {
				org_id: 81,
				item_no: item_no
			}
		})
			.then(({ data }) => {
				if (data.State) {
					this.setState({ revisionList: data.Data, queryModel: {
						...this.state.queryModel,
						revision: data.Data.length ? data.Data[0].revision : ''
					} });
				}
			});
	}

	// 根据计划类型获取测算日期
	getEffectivityDateByPlanType(plan_type) {
		this.setState({
			queryModel: {
				...this.state.queryModel,
				plan_type: plan_type
			},
			effectivityDateList: []
		});
		http.get('Core/GetEffectivityDate', {
			params: {
				plan_type: plan_type
			}
		})
			.then(({ data }) => {
				if (data.State) {
					this.setState({ effectivityDateList: data.Data });
				}
			});
	}

	handleQuery(e) {
		e.preventDefault();
		this.props.form.validateFields((err, fieldsValue) => {
			if (err) return;
			this.props.onQuery(fieldsValue);
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		let itemAutoCompleteOptions = this.state.itemList.map((item) => {
			return (
				<AutoComplete.Option 
					className="autocomplete-option" 
					key={item.item_no}
					itemNo={item.item_no}
					itemCpxh={item.item_cpxh}>
					<span style={{width: '80px'}}>{item.item_no}</span>
					<span>{item.item_cpxh}</span>
				</AutoComplete.Option>
			);
		});
	
		return (
			<Form>
				<Row>
					<Col {...this.formLayout}>
						<Form.Item label="计划类型" required>
							{
								getFieldDecorator('plan_type', {
									rules: [{ required: true, message: '计划类型必填' }]
								})(
									<Select onChange={this.getEffectivityDateByPlanType}>
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
					<Col {...this.formLayout}>
						<Form.Item label="物品编码" required>
							{
								getFieldDecorator('item_no', {
									rules: [{ required: true, message: '物品编码必填' }],
									initialValue: this.state.queryModel.item_no
								})(
									<AutoComplete
										dataSource={itemAutoCompleteOptions}
										onSelect={this.handleSelect}
										onSearch={(value) => this.handleSearch('item_no', value)}
										placeholder="输入并从下拉列表中选择"
										dropdownMatchSelectWidth={false}
										dropdownStyle={{width: 300}}
										optionLabelProp="itemNo"
									/>
								)
							}
						</Form.Item>
					</Col>
					<Col {...this.formLayout}>
						<Form.Item label="物品型号" required>
							{
								getFieldDecorator('item_cpxh', {
									rules: [{ required: true, message: '物品型号必填' }],
									initialValue: this.state.queryModel.item_cpxh
								})(
									<AutoComplete
										dataSource={itemAutoCompleteOptions}
										onSelect={this.handleSelect}
										onSearch={(value) => this.handleSearch('item_cpxh', value)}
										placeholder="输入并从下拉列表中选择"
										dropdownMatchSelectWidth={false}
										dropdownStyle={{width: 300}}
										optionLabelProp="itemCpxh"
									/>
								)
							}
						</Form.Item>
					</Col>
					<Col {...this.formLayout}>
						<Form.Item label="硬件版本" required>
							{
								getFieldDecorator('revision', {
									rules: [{ required: true, message: '硬件版本必填' }],
									initialValue: this.state.queryModel.revision
								})(
									<Select>
										{this.state.revisionList.map((item) => (<Option value={item.revision} key={item.revision}>{item.revision}</Option>))}
									</Select>
								)
							}
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col {...this.formLayout}>
						<Form.Item label="测算日期" required>
							{
								getFieldDecorator('effectivity_date', {
									rules: [{ required: true, message: '测算日期必填' }]
								})(
									<Select>
										{this.state.effectivityDateList.map((item) => (<Option value={formatMSDate(item.effectivity_date, 'yyyy-MM-dd HH:mm:ss')} key={item.effectivity_date}>{formatMSDate(item.effectivity_date, 'yyyy-MM-dd HH:mm:ss')}</Option>))}
									</Select>
								)
							}
						</Form.Item>
					</Col>
					<Col {...this.formLayout}>
						<Form.Item label="成品/半成品">
							<span>{this.state.batchInfo.item_type}</span>
						</Form.Item>
					</Col>
					<Col {...this.formLayout}>
						<Form.Item label="平均生产批量">
							<span>{this.state.batchInfo.num_make_batch}</span>
						</Form.Item>
					</Col>
					<Col {...this.formLayout}>
						<Form.Item label="平均发货批量">
							<span>{this.state.batchInfo.num_ship_batch}</span>
						</Form.Item>
					</Col>
				</Row>
				<Form.Item style={{textAlign: 'right'}}>
					<Button
						type="primary"
						htmlType="submit"
						onClick={this.handleQuery}>
						查询
					</Button>
				</Form.Item>
			</Form>
		);
	}
});

export default class SingleProductQuery extends React.Component {
	state = {
		isLoading: false,
		dataList: []
	};

	columns = [{
		title: '物品编码',
		dataIndex: 'item_no'
	}, {
		title: '物品型号',
		dataIndex: 'item_cpxh'
	}, {
		title: '硬件版本',
		dataIndex: 'revision'
	}, {
		title: '成品/半成品',
		dataIndex: 'item_type'
	}, {
		title: 'BOM/构成数量',
		dataIndex: 'quantity_bom'
	}, {
		title: '平均生产批量',
		dataIndex: 'num_ship_batch'
	}];

	constructor(props) {
		super(props);

		this.handleQuery = this.handleQuery.bind(this);
	}

	handleQuery(queryModel) {
		this.setState({ isLoading: true });
		http.get('Core/QueryItemSumCost', {
			params: {
				queryParamJson: JSON.stringify({
					...queryModel,
					org_id: 81
				})
			}
		})
			.then(({ data }) => {
				this.setState({ isLoading: false });
				if (data.State) {
					this.setState({ dataList: data.Data });
				} else {
					message.error(data.Msg);
				}
			});
	}

	render() {

		return (
			<Card>
				<QueryForm onQuery={this.handleQuery} />
				<Table 
					columns={this.columns}
					dataSource={this.state.dataList}
					loading={this.state.isLoading}
					size="small"
					bordered={true}
					rowKey="rowno" />
			</Card>
		);
	}
}