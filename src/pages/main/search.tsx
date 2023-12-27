import React, { useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd/es/select";
import { SearchOutlined } from "@ant-design/icons";
import { Service } from "../../globe/service";
import { ISearchProps } from "../../globe/inter";
import { useNavigate } from "react-router-dom";

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

function fetch(value: string, callback: Function) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  const fake = () => {
    Service.userSearch(value).then((res) => {
      if (currentValue === value) {
        const data = res.data.data;
        const dataArr = data.map((item: ISearchProps) => {
          return {
            value: item.ID,
            text: item.title,
          };
        });
        callback(dataArr);
      }
    });
  };
  if (value) {
    timeout = setTimeout(fake, 300);
  } else {
    callback([]);
  }
}

const SearchInput: React.FC<{
  placeholder: string;
  style: React.CSSProperties;
}> = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    fetch(newValue, setData);
  };

  const handleChange = (newValue: string) => {
    if (newValue !== undefined) {
      navigate("/main/article", { replace: true, state: { id: newValue } });
    }
  };

  return (
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
      notFoundContent={<div>找不到相关信息捏</div>}
      allowClear={true}
      loading={true}
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
