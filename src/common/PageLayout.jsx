import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Menu, Icon } from 'antd';
const { Sider, Header, Content } = Layout;

export default class PageLayout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			siderSollapsed: false
		};

		this.toggleSider = this.toggleSider.bind(this);
		this.logout = this.logout.bind(this);
	}

	static propTypes = {
		nav: PropTypes.string.isRequired,
		main: PropTypes.element.isRequired
	};

	// 侧边栏显示/隐藏切换
	toggleSider() {
		this.setState({
			siderSollapsed: !this.state.siderSollapsed
		});
	}

	// 退出登录
	logout() {
		location.href = window.OP_CONFIG.logoutUrl + '?returnUrl=' + encodeURIComponent(location.href);
	}

	render() {
		return (
			<Layout className="layout">
				<Sider 
					className="sider"
					width="230"
					trigger={null}
					collapsible
					collapsed={this.state.siderSollapsed}>
					<div className="logo">
						<Icon type="home" />
						<span className="sys-name">制造成本测算系统</span>
					</div>
					<Menu 
						theme="dark"
						mode="inline"
						defaultSelectedKeys={['1']}>
						<Menu.Item key="1">
							<Icon type="search"></Icon>
							<span>单一查询</span>
						</Menu.Item>
						<Menu.Item key="2">
							<Icon type="area-chart"></Icon>
							<span>报表查询</span>
						</Menu.Item>
						<Menu.Item key="3">
							<Icon type="setting"></Icon>
							<span>系统设置</span>
						</Menu.Item>
						<Menu.Item key="4">
							<Icon type="solution"></Icon>
							<span>权限管理</span>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className="content">					
					<Header className="header">
						<Icon
							className="sider-trigger"
							type={this.state.siderSollapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.toggleSider}
						/>
						<div className="user-info">
							<Icon type="user"></Icon>
							<span>欢迎您，何霖</span>
							<span className="logout" onClick={this.logout}>退出</span>
						</div>
						<h2 className="page-nav">{this.props.nav}</h2>
					</Header>
					<Content className="main">{this.props.main}</Content>
				</Layout>
			</Layout>
		);
	}
}