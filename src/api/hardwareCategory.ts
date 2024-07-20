// src/api/category.ts

import { post, put, del, get } from "./api";

const baseUrl = "/hardwareCategory";
// 定义 Category 类型
export interface Category {
	id: number;
	name: string;
	children?: Category[];
	// 根据实际需要添加更多字段
}

interface CreateCategoryData {
	name: string;
	// 根据实际需要添加更多字段
}

interface UpdateCategoryData {
	id: number;
	name?: string;
	// 根据实际需要添加更多字段
}

// 创建 Category
export const createCategory = (data: CreateCategoryData): Promise<Category> => {
	return post<Category>(baseUrl + "/categories", data);
};

// 更新 Category
export const updateCategory = (data: UpdateCategoryData): Promise<Category> => {
	return put<Category>(baseUrl + `/categories/${data.id}`, data);
};

// 删除 Category
export const deleteCategory = (id: number): Promise<void> => {
	return del<void>(baseUrl + `/categories/${id}`);
};

// 获取所有 Categories
export const getAllCategories = (): Promise<Category[]> => {
	return get<Category[]>(baseUrl + "/categories");
};

// 获取特定 ID 的 Category
export const getCategoryById = (id: number): Promise<Category> => {
	return get<Category>(baseUrl + `/categories/${id}`);
};
