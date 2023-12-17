import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  message,
} from "antd";
import "./css/friendEdit.css";
import { useEffect, useState } from "react";
import { IFriendLink } from "../../globe/inter";
import { Service } from "../../globe/service";

interface Item {
  key: string;
  cover: string;
  description: string;
  name: string;
  url: string;
}
const originData: Item[] = [];
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export function FriendEditPage() {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  function success(text: string = "编辑成功") {
    messageApi.open({
      type: "success",
      content: text,
    });
  }
  function error(text: string = "编辑失败，请重试") {
    messageApi.open({
      type: "error",
      content: text,
    });
  }
  useEffect(() => {
    Service.getFriendLink().then((res) => {
      const promises = res.data.data.map((i) => {
        const it: Item = {
          key: i.name,
          cover: i.cover,
          description: i.description,
          name: i.name,
          url: i.url,
        };
        return it;
      });
      Promise.all(promises).then((res) => {
        setData(res);
      });
    });
  }, []);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", url: "", description: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;//as key实际上不包含key，即没有索引值,从这获取更新值
      let newData = [...data];//此时能拿到更新值，但根据索引找到对应行后不是更新值，通过row修改
      const index = newData.findIndex((item) => key === item.key);
      //通过row修改，使其真正的是newData,cover不可修改所以没有重新赋值
      newData[index].key = row.name
      newData[index].description = row.description
      newData[index].name = row.name
      newData[index].url = row.url
      if (index > -1) {
        const item = newData[index];
        const tempItem: IFriendLink = {
          cover: item.cover,
          description: item.description,
          name: item.name,
          url: item.url,
        };
        Service.saveFriendLinkEdit(tempItem)
          .then(() => {
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            setData(newData);
            setEditingKey("");
            success();
          })
          .catch(() => {
            error();
          });
      }
    } catch (errInfo) {
      error();
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "15%",
      editable: true,
    },
    {
      title: "url",
      dataIndex: "url",
      width: "25%",
      editable: true,
    },
    {
      title: "description",
      dataIndex: "description",
      width: "50%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 0 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <div>Cancel</div>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      {contextHolder}
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            pageSize: 10,
          }}
        />
      </Form>
    </>
  );
}
