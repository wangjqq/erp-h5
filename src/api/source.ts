import { post, put, del, get } from "./api";

const baseUrl = "/source";

export interface Source {
	id: number;
	name: string;
	addressDetail: string;
	// 根据实际需要添加更多字段
}

interface CreateSourceData {
	name: string;
	// 根据实际需要添加更多字段
}

interface UpdateSourceData {
	id: number;
	name?: string;
	// 根据实际需要添加更多字段
}

// 创建 Source
export const createSource = (data: CreateSourceData): Promise<Source> => {
	return post<Source>(baseUrl + "/sources", data);
};

// 更新 Source
export const updateSource = (data: UpdateSourceData): Promise<Source> => {
	return put<Source>(baseUrl + `/sources/${data.id}`, data);
};

// 删除 Source
export const deleteSource = (id: number): Promise<void> => {
	return del<void>(baseUrl + `/sources/${id}`);
};

// 获取所有 Sources
export const getAllSources = (): Promise<Source[]> => {
	return get<Source[]>(baseUrl + "/sources");
};

// 获取特定 ID 的 Source
export const getSourceById = (id: number): Promise<Source> => {
	return get<Source>(baseUrl + `/sources/${id}`);
};
