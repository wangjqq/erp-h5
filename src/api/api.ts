import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// 创建 Axios 实例
const apiClient: AxiosInstance = axios.create({
	baseURL:
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "http://110.188.86.233:7777/api", // 设置基础 URL
	timeout: 10000, // 请求超时时间
	headers: {
		"Content-Type": "application/json",
	},
});

// 请求拦截器
apiClient.interceptors.request.use(
	(config) => {
		// 在请求发出之前做些什么
		// 例如: 添加认证 token
		// const token = localStorage.getItem('token');
		// if (token) {
		//   config.headers.Authorization = `Bearer ${token}`;
		// }
		return config;
	},
	(error) => {
		// 处理请求错误
		return Promise.reject(error);
	}
);

// 响应拦截器
apiClient.interceptors.response.use(
	(response: AxiosResponse) => {
		// 对响应数据做些什么
		return response.data;
	},
	(error) => {
		// 处理响应错误
		return Promise.reject(error);
	}
);

// 封装 GET 请求
export const get = <T>(url: string, params?: Record<string, any>): Promise<T> => {
	return apiClient.get<T>(url, { params }).then((response) => {
		console.log(response);
		return response.data;
	});
};

// 封装 POST 请求
export const post = <T>(url: string, data?: Record<string, any>): Promise<T> => {
	return apiClient.post<T>(url, data).then((response) => response.data);
};

// 封装 PUT 请求
export const put = <T>(url: string, data?: Record<string, any>): Promise<T> => {
	return apiClient.put<T>(url, data).then((response) => response.data);
};

// 封装 DELETE 请求
export const del = <T>(url: string): Promise<T> => {
	return apiClient.delete<T>(url).then((response) => response.data);
};
