import { Tabs } from "antd-mobile";
import React from "react";
import HardwareCategory from "./components/HardwareCategory";
import Source from "./components/Source";

const Setting = () => {
	return (
		<Tabs style={{ height: "100%" }}>
			<Tabs.Tab title="客户管理" key="fruits">
				菠萝
			</Tabs.Tab>
			<Tabs.Tab title="硬件分类管理" key="HardwareCategory">
				<HardwareCategory />
			</Tabs.Tab>
			<Tabs.Tab title="报价单模板管理" key="animals">
				蚂蚁
			</Tabs.Tab>
			<Tabs.Tab title="渠道管理" key="Source">
				<Source />
			</Tabs.Tab>
		</Tabs>
	);
};

export default Setting;
