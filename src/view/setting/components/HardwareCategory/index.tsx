import {
	Button,
	Collapse,
	Dialog,
	Empty,
	ErrorBlock,
	Form,
	Input,
	Space,
	Toast,
} from "antd-mobile";
import { AddOutline, DeleteOutline, EditSOutline } from "antd-mobile-icons";
import React, { useEffect, useState } from "react";
import {
	Category,
	createCategory,
	deleteCategory,
	getAllCategories,
	updateCategory,
} from "@/api/hardwareCategory";

const HardwareCategory = () => {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);

	const [dataList, setDataList] = useState<Category[]>([]);

	const getList = () => {
		getAllCategories().then((res) => {
			console.log(res);
			setDataList(res);
		});
	};
	useEffect(() => {
		getList();
	}, []);

	return (
		<div style={{ overflow: "auto" }}>
			<Button color="primary" fill="none" onClick={() => setVisible(true)}>
				<AddOutline /> 新增一级类目
			</Button>
			<Collapse>
				{dataList?.map((item) => (
					<Collapse.Panel
						key={item.id.toString()}
						title={
							<div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
								<span>{item.name}</span>
								<Space>
									<AddOutline
										onClick={(e) => {
											e.stopPropagation();
											form.setFieldValue("parentId", item.id);
											setVisible(true);
										}}
									/>
									<EditSOutline
										onClick={(e) => {
											e.stopPropagation();
											form.setFieldsValue({ id: item.id, name: item.name });
											setVisible(true);
										}}
									/>
									<DeleteOutline
										onClick={async (e) => {
											e.stopPropagation();
											Dialog.confirm({
												content: "确认删除",
												onConfirm: async () => {
													await deleteCategory(item.id);
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
							</div>
						}
					>
						{item.children?.length ? (
							item.children?.map((child) => (
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										fontSize: "16px",
										color: "#666666",
										padding: "10px ",
									}}
									key={child.id.toString()}
								>
									<div>{child.name}</div>
									<Space>
										<EditSOutline
											onClick={async (e) => {
												e.stopPropagation();
												await setVisible(true);
												form.setFieldsValue({
													id: child.id,
													name: child.name,
													parentId: item.id,
												});
											}}
										/>
										<DeleteOutline
											onClick={async (e) => {
												e.stopPropagation();
												Dialog.confirm({
													content: "确认删除",
													onConfirm: async () => {
														await deleteCategory(child.id);
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
								</div>
							))
						) : (
							<Empty description="暂无数据" />
						)}
					</Collapse.Panel>
				))}
			</Collapse>
			<Dialog
				title="分类"
				visible={visible}
				content={
					<Form form={form} layout="horizontal">
						<Form.Item name="parentId" noStyle>
							<Input style={{ display: "none" }} />
						</Form.Item>
						<Form.Item name="id" noStyle>
							<Input style={{ display: "none" }} />
						</Form.Item>
						<Form.Item name="name" label="名称">
							<Input placeholder="请输入名称" />
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
										const data = await form.validateFields();
										const fn = data.id ? updateCategory : createCategory;
										await fn(data);
										Toast.show({
											icon: "success",
											content: "保存成功",
										});
										await getList();
										form.resetFields();
										setVisible(false);
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

export default HardwareCategory;
