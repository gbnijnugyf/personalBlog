import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Layout,
  Popconfirm,
  Space,
  Table,
  Typography,
  Upload,
  message,
} from "antd";
import "./css/friendEdit.css";
import { FriendPage } from "../main/friend";
import { useEffect, useState } from "react";
import { IFriendLink } from "../../globe/inter";
import { link } from "fs";
import { Service } from "../../globe/service";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";

// export function FriendEditPage() {
//   const [open, setOpen] = useState(false);
//   const [messageApi, contextHolder] = message.useMessage();

//   const [friendLinkList, setFriendLinkList] = useState<IFriendLink[]>();
//   const [display, setDisplay] = useState<boolean>(false);
//   useEffect(() => {
//     Service.getFriendLink().then((res) => {
//       const list: IFriendLink[] = res.data.data;
//       setFriendLinkList(list);
//     });
//   }, [display]);

//   function success(text: string = "添加成功") {
//     messageApi.open({
//       type: "success",
//       content: text,
//     });
//   }
//   function error(text: string = "添加失败") {
//     messageApi.open({
//       type: "error",
//       content: text,
//     });
//   }
//   return (
//     <>
//       <Layout style={{backgroundColor:"white"}}>
//         {contextHolder}
//         <Button
//           onClick={() => {
//             setOpen(true);
//           }}
//         >
//           添加友情链接
//         </Button>
//         <FriendPage admin={true} data={friendLinkList} />
//         <Drawer
//           title="添加友情链接"
//           placement="right"
//           onClose={() => setOpen(false)}
//           open={open}
//         >
//           <FriendPublishForm
//             successFunc={success}
//             failFunc={error}
//             setDisplay={setDisplay}
//             dispaly={display}
//           />
//         </Drawer>
//       </Layout>
//     </>
//   );
// }

// interface IFriendPublishFormProps {
//   successFunc: () => void;
//   failFunc: () => void;
//   setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
//   dispaly: boolean;
// }
// function FriendPublishForm(props: IFriendPublishFormProps) {
//   const formItemLayout = {
//     labelCol: { span: 6 },
//     wrapperCol: { span: 14 },
//   };
//   const normFile = (e: any) => {
//     // return fileToBase64(e.file)
//     console.log("Upload event:", e);
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e?.fileList;
//   };

//   interface IPublishForm {
//     linkName: string;
//     description: string;
//     url: string;
//     cover: any[];
//   }
//   const onFinish = (values: IPublishForm) => {
//     let fileBase64 = null;
//     console.log("Received values of form: ", values);
//     if (values.cover !== undefined) {
//       fileBase64 = values.cover[0].thumbUrl;
//       // console.log("image: ", values.cover[0].thumbUrl);
//     }
//     const linkInfo: IFriendLink = {
//       cover: fileBase64,
//       description: values.description,
//       name: values.linkName,
//       url: values.url,
//     };
//     Service.addFriendLink(linkInfo)
//       .then((res) => {
//         console.log(res);
//         props.setDisplay(!props.dispaly);
//         props.successFunc();
//       })
//       .catch(() => {
//         props.failFunc();
//       });
//   };
//   return (
//     <Form
//       name="validate_other"
//       {...formItemLayout}
//       onFinish={onFinish}
//       style={{ maxWidth: 600 }}
//     >
//       <Form.Item name="linkName" label="链接名" rules={[{ required: true }]}>
//         <Input placeholder="请输入链接名" showCount maxLength={15} />
//       </Form.Item>
//       <Form.Item name="linkUrl" label="链接地址" rules={[{ required: true }]}>
//         <Input placeholder="请输入链接地址" maxLength={9999} />
//       </Form.Item>
//       <Form.Item
//         name="linkDescribe"
//         label="链接描述"
//         rules={[{ required: true }]}
//       >
//         <TextArea
//           showCount
//           rows={4}
//           placeholder="maxLength is 200"
//           maxLength={200}
//         />
//       </Form.Item>

//       <Form.Item
//         name="cover"
//         label="链接缩略图"
//         valuePropName="fileList"
//         getValueFromEvent={normFile}
//       >
//         <Upload name="logo" action="/upload.do" listType="picture">
//           <Button icon={<UploadOutlined />}>Click to upload</Button>
//         </Upload>
//       </Form.Item>

//       <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
//         <Space>
//           <Button type="primary" htmlType="submit">
//             提交
//           </Button>
//           <Button htmlType="reset">重置</Button>
//         </Space>
//       </Form.Item>
//     </Form>
//   );
// }
interface Item {
  key: string;
  cover: string;
  description: string;
  name: string;
  url: string;
}
const originData: Item[] = [];
// for (let i = 0; i < 100; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }
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
      // const list: Item[] = res.data.data.;
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
      const row = (await form.validateFields()) as Item;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        console.log("index:", index);
        const item = newData[index];
        console.log("11:", item);
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

  // interface Item {
  //   key: string;
  //   cover: string;
  //   description: string;
  //   name: string;
  //   url: string;
  // }
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
            pageSize:10
          }}
        />
      </Form>
    </>
  );
}
