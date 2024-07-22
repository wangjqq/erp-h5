import {
	Button,
	Checkbox,
	Dialog,
	Empty,
	Form,
	Input,
	Radio,
	Space,
	TextArea,
	Toast,
} from "antd-mobile";
import { AddOutline, DeleteOutline, EditSOutline, EyeOutline } from "antd-mobile-icons";
import React, { useEffect, useState } from "react";
import Table from "rc-table";
import {
	createSource,
	deleteSource,
	getAllSources,
	Source as ISource,
	updateSource,
} from "@/api/source";
import AddressPicker from "@/components/AddressPicker";
import { extractLabels } from "@/utils/util";

const Source = () => {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [dataList, setDataList] = useState<ISource[]>([]);
	const [formType, setFormType] = useState("edit");

	const getList = () => {
		getAllSources().then((res) => {
			setDataList(res);
		});
	};
	useEffect(() => {
		getList();
	}, []);

	return (
		<div>
			<Button
				color="primary"
				fill="none"
				onClick={() => {
					setFormType("edit");
					setVisible(true);
				}}
			>
				<AddOutline /> 新增渠道
			</Button>
			<Table
				rowKey="id"
				emptyText={<Empty description="暂无数据" />}
				columns={[
					{
						title: "名称",
						dataIndex: "name",
						width: 100,
						ellipsis: true,
						render(value, record, index) {
							return (
								<div style={{ width: 100 }} className="rc-table-cell-ellipsis">
									{value}
								</div>
							);
						},
					},
					{
						title: "地址",
						dataIndex: "address",
						width: 100,
						render(value, record) {
							return (
								<div style={{ width: 100 }} className="rc-table-cell-ellipsis">
									{value?.length ? extractLabels(value) : record.addressDetail}
								</div>
							);
						},
						ellipsis: true,
					},
					{
						title: "电话",
						dataIndex: "phone",
						width: 100,
					},
					{
						title: "操作",
						dataIndex: "options",
						width: 100,
						render(value, record, index) {
							return (
								<Space>
									<EyeOutline
										onClick={() => {
											console.log(record);
											setFormType("detail");
											form.setFieldsValue(record);
											setVisible(true);
										}}
									/>
									<EditSOutline
										onClick={() => {
											setFormType("edit");
											form.setFieldsValue(record);
											setVisible(true);
										}}
									/>
									<DeleteOutline
										onClick={async (e) => {
											Dialog.confirm({
												content: "确认删除",
												onConfirm: async () => {
													await deleteSource(record.id);
													await getList();
													Toast.show({
														icon: "success",
														content: "删除成功",
													});
												},
											});
										}}
									/>
								</Space>
							);
						},
					},
				]}
				data={dataList}
			/>
			<Dialog
				title="渠道"
				visible={visible}
				content={
					<Form form={form} layout="horizontal" disabled={formType === "detail"}>
						<Form.Item name="id" noStyle>
							<Input style={{ display: "none" }} />
						</Form.Item>
						<Form.Item name="name" label="名称" rules={[{ required: true, message: "请输入名称" }]}>
							<Input placeholder="请输入名称" />
						</Form.Item>
						<Form.Item name="address" label="地址" initialValue={[]}>
							<AddressPicker />
						</Form.Item>
						<Form.Item name="addressDetail" label="详细地址">
							<TextArea placeholder="请输入详细地址" />
						</Form.Item>
						<Form.Item name="phone" label="电话号码">
							<Input placeholder="请输入电话号码" />
						</Form.Item>
						<Form.Item name="mainBusiness" label="主营项目">
							<Input placeholder="请输入主营项目" />
						</Form.Item>
						<Form.Item name="priceAdvantage" label="价格优势" initialValue="高">
							<Radio.Group>
								<Space>
									<Radio value="高">高</Radio>
									<Radio value="中">中</Radio>
									<Radio value="低">低</Radio>
								</Space>
							</Radio.Group>
						</Form.Item>
						<Form.Item
							name="types"
							label="渠道类型"
							initialValue={["进货渠道"]}
							rules={[{ required: true, message: "请选择渠道类型" }]}
						>
							<Checkbox.Group>
								<Space direction="vertical">
									<Checkbox value="进货渠道">进货渠道</Checkbox>
									<Checkbox value="出货渠道">出货渠道</Checkbox>
								</Space>
							</Checkbox.Group>
						</Form.Item>
					</Form>
				}
				onClose={() => {
					form.resetFields();
					setVisible(false);
				}}
				actions={[
					{
						key: "submit",
						text: (
							<Space>
								<Button
									color="primary"
									fill="none"
									onClick={(e) => {
										e.stopPropagation();
										e.preventDefault();
										form.resetFields();
										setVisible(false);
									}}
								>
									取消
								</Button>
								<Button
									color="primary"
									fill="none"
									onClick={async (e) => {
										e.stopPropagation();
										e.preventDefault();
										if (formType === "detail") {
											setVisible(false);
											return;
										}
										form
											.validateFields()
											.then(async (data) => {
												const fn = data.id ? updateSource : createSource;
												await fn(data);
												Toast.show({
													icon: "success",
													content: "保存成功",
												});
												await getList();
												form.resetFields();
												setVisible(false);
											})
											.catch((err) => {
												console.log(err);
											});
									}}
								>
									确定
								</Button>
							</Space>
						),
					},
				]}
			/>
		</div>
	);
};

export default Source;
