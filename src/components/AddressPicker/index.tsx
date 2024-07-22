import { CascaderValue } from "antd-mobile/es/components/cascader";
import { Cascader } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { LOCATION_OPTIONS } from "@/static/data";
import { extractLabels } from "@/utils/util";

const AddressPicker = ({
	value,
	onChange,
}: {
	value?: CascaderValue[];
	onChange?: (value: CascaderValue[]) => void;
}) => {
	const [visible, setVisible] = useState(false);
	return (
		<div>
			<div onClick={() => setVisible(true)}>{extractLabels(value)}</div>
			<Cascader
				options={LOCATION_OPTIONS}
				value={value}
				onConfirm={(value) => {
					onChange?.(value);
					setVisible(false);
				}}
				visible={visible}
				onClose={() => {
					setVisible(false);
				}}
			/>
		</div>
	);
};

export default AddressPicker;
