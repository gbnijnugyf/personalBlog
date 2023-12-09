import React, { useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd/es/select";
import { SearchOutlined } from "@ant-design/icons";
import { Service } from "../../globe/service";
import { ISearchProps } from "../../globe/inter";

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetch = (value: string, callback: Function) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  console.log(value);
  const fake = () => {
    Service.userSearch(value).then((res) => {
      console.log(res);
      if (currentValue === value) {
        const { data } = res.data;
        console.log("data:", data);
        const dataArr = data.map((item: ISearchProps) => {
          return {
            value: item.ID,
            text: item.title,
          };
        });
        console.log("dataArr:", dataArr);
        callback(dataArr);
      }
    });
  };
  if (value) {
    timeout = setTimeout(fake, 300);
  } else {
    callback([]);
  }
};

const SearchInput: React.FC<{
  placeholder: string;
  style: React.CSSProperties;
}> = (props) => {
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    fetch(newValue, setData);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    //TODO:样式优化，输入框失去焦点时会回到上一次输入
    <Select
      showSearch
      value={value}
      placeholder={"搜索文章"}
      style={props.style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      allowClear={true}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  );
};

export function SearchTest1() {
  return (
    <>
      <SearchInput placeholder="input search text" style={{ width: 200 }} />
      <SearchOutlined />
    </>
  );
}