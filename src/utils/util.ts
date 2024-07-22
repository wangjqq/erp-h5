import { CascaderValue } from "antd-mobile/es/components/cascader";
import { LOCATION_OPTIONS } from "@/static/data";

export const extractLabels = (value?: CascaderValue[]): string => {
	const labels: string[] = [];
	let index1 = 0;
	let index2 = 0;
	let index3 = 0;
	if (!value || !value?.length) {
		return "选择地址";
	}
	if (value.length >= 1) {
		index1 = LOCATION_OPTIONS.findIndex((item) => item.value === value[0]);
		labels.push(LOCATION_OPTIONS[index1].label);
	}
	if (value.length >= 2) {
		index2 = LOCATION_OPTIONS[index1].children.findIndex((item) => item.value === value[1]);
		labels.push(LOCATION_OPTIONS[index1].children[index2].label);
	}
	if (value.length === 3) {
		index3 = LOCATION_OPTIONS[index1].children[index2].children.findIndex(
			(item) => item.value === value[2]
		);
		labels.push(LOCATION_OPTIONS[index1].children[index2].children[index3].label);
	}
	return labels.join("");
};
