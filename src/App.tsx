import React, { useState } from "react";
import { TabBar } from "antd-mobile";
import {
	AppOutline,
	FileOutline,
	SetOutline,
	ShopbagOutline,
	UserOutline,
} from "antd-mobile-icons";
import logo from "./logo.svg";
import Repertory from "./view/repertory";
import styles from "./App.module.less";

import Home from "./view/home";
import Setting from "./view/setting";
import Report from "./view/report";
import User from "./view/user";

function App() {
	const [activeTab, setActiveTab] = useState("home");
	const tabs = [
		{
			key: "home",
			title: "首页",
			icon: <AppOutline />,
		},
		{
			key: "repertory",
			title: "库存",
			icon: <ShopbagOutline />,
		},
		{
			key: "report",
			title: "报价单",
			icon: <FileOutline />,
		},
		{
			key: "setting",
			title: "管理",
			icon: <SetOutline />,
		},
		{
			key: "user",
			title: "我的",
			icon: <UserOutline />,
		},
	];
	return (
		<div className={styles.app}>
			<div className={styles["tab-content"]}>
				{activeTab === "home" && <Home />}
				{activeTab === "repertory" && <Repertory />}
				{activeTab === "report" && <Report />}
				{activeTab === "setting" && <Setting />}
				{activeTab === "user" && <User />}
			</div>
			<div className={styles["tab-bar"]}>
				<TabBar activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
					{tabs.map((item) => (
						<TabBar.Item key={item.key} icon={item.icon} title={item.title} />
					))}
				</TabBar>
			</div>
		</div>
	);
}

export default App;
