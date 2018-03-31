import React from 'react';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content } = Layout;

export default class PageLayout extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Layout className="layout">
				<Header className="header">
					<div className="logo">
						<Icon type="home" />
						<span>制造成本精细化测算管理</span>
					</div>
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={['1']}
						style={{ lineHeight: '50px' }}
					>
						<Menu.Item key="1">单一查询</Menu.Item>
						<Menu.Item key="2">报表查询</Menu.Item>
						<Menu.Item key="3">系统设置</Menu.Item>
						<Menu.Item key="4">权限管理</Menu.Item>
					</Menu>
				</Header>
				<Content className="content">
					<Breadcrumb className="nav">
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<div className="main">{this.props.children}</div>
				</Content>
			</Layout>
		);
	}
}