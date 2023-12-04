import React, { useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { Select, Spin } from "antd";
import type { SelectProps } from "antd/es/select";
import { SearchOutlined } from "@ant-design/icons";
import { BASEURL } from "../../globe/inter";
import { Service } from "../../globe/service";
import qs from "qs";
import jsonp from "fetch-jsonp";


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
    const str = qs.stringify({
      code: "utf-8",
      q: value,
    });
    // const url = BASEURL + "/main/search";
    // const urlWithQuery = url + "?word=" + value;
    Service.userSearch(value).then((res) => {
      // console.log(res);
      if (currentValue === value) {
        const { data } = res.data;
        console.log("data:",data)
        const dataArr = data.map((item: any) => ({
          value: item[0],
          text: item[0],
        }));
        console.log("dataArr:",dataArr)
        callback(dataArr);
      }
    });
    // jsonp(urlWithQuery)
    //   .then((response: any) => {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then((d: any) => {
    //     if (currentValue === value) {
    //       const { result } = d;
    //       const data = result.map((item: any) => ({
    //         value: item[0],
    //         text: item[0],
    //       }));
    //       callback(data);
    //     }
    //   });
    // jsonp(`https://suggest.taobao.com/sug?${str}`)
    //   .then((response: any) => {
    //     return response.json();
    //   })
    //   .then((d: any) => {
    //     if (currentValue === value) {
    //       const { result } = d;
    //       console.log("data:",result)
    //       const data = result.map((item: any) => ({
    //         value: item[0],
    //         text: item[0],
    //       }));
    //       console.log("dataArr:",data)
    //       callback(data);
    //     }
    //   });
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
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
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
      {" "}
      <SearchInput placeholder="input search text" style={{ width: 200 }} />
    </>
  );
}
