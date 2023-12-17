import {
  Form,
  Input,
  InputNumber,
  Menu,
  Modal,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import Sider from "antd/es/layout/Sider";
import Layout, { Content } from "antd/es/layout/layout";
import React, { useEffect, useRef, useState } from "react";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./css/articlePublish.css";
import "markdown-navbar/dist/navbar.css";
import "github-markdown-css/github-markdown-light.css";
import { useNavigate } from "react-router-dom";
import { Service } from "../../globe/service";
import {
  ClaOrFri,
  IAddClassify,
  IClassEdit,
  IMenuInfo,
} from "../../globe/inter";
import TextArea from "antd/es/input/TextArea";
import { ArticleEdit, IArticleEdit } from "./articleEdit";
export interface articleMemuItem {
  key: string; //文章ID
  icon?: JSX.Element;
  label: string; //文章标题
}
export interface articleMenu {
  key: string; //类别名称
  label: string; //类别名称
  children?: articleMemuItem[]; //分类下的文章列表
  icon?: JSX.Element;
}

export function ArticleManagerPage() {
  // const [md, setMd] = useState("./test.md");
  const [listArr, setListdArr] = useState<articleMenu[]>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [isAddClassifyOpen, setIsAddClassifyOpen] = useState(false);
  const [isEditClassifyOpen, setIsEditClassifyOpen] = useState(false);
  const userEditClassify = useRef("");
  const userEditClassifyDescribe = useRef("");
  const [nowClassify, setNowClassify] = useState(""); // 分类
  const [nowArticleID, setNowArticleID] = useState(""); // 分类
  const newArticleInit: IArticleEdit = {
    classify: "",
    ID: "",
  };
  const [newArticle, setNewArticle] = useState<IArticleEdit>(newArticleInit); //当添加新文章并保存时，需要修改文章列表

  const handleEditClassifyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    userEditClassify.current = e.target.value;
  };
  const handleEditClassifyDescribeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    userEditClassifyDescribe.current = e.target.value;
  };
  const handleOk = () => {
    const tempForm: IAddClassify = {
      name: userEditClassify.current,
      description: userEditClassifyDescribe.current,
    };
    Service.addClassify(tempForm).then((res) => {
      setDisplay(!display);
      //TODO:添加成功提示
      console.log("添加分类接口响应:", res);
    });
    setIsAddClassifyOpen(false);
  };
  const handleCancel = () => {
    setIsAddClassifyOpen(false);
  };
  const handleCancel1 = () => {
    setIsEditClassifyOpen(false);
  };
  const navigate = useNavigate();

  useEffect(() => {
    Service.getClassify().then(async (res) => {
      console.log("11", res);
      const classifyArr = res.data.data.map((item) => item.name);
      const promises = classifyArr.map((classify) =>
        Service.getArticleListByClassify(classify).then((res) => {
          const list: articleMemuItem[] = res.data.data.map((aitem) => {
            const temp: articleMemuItem = {
              key: aitem.ID,
              label: aitem.title,
            };
            return temp;
          });
          list.push({
            key: "unique-add-" + classify, //TODO：此处添加文章需要避开这个key，避免二义性
            label: "添加文章",
            icon: <PlusCircleOutlined />,
          });
          return {
            key: classify,
            label: classify,
            children: list,
          };
        })
      );

      Promise.all(promises).then((res) => {
        let menuList: articleMenu[] = res;
        menuList.push({
          key: "unique-add-classify",
          label: "新增分类",
          icon: <PlusCircleOutlined />,
        });
        menuList.push({
          key: "unique-edit-classify",
          label: "编辑分类",
          icon: <EditOutlined />,
        });
        setListdArr(menuList);
      });
    });
    if (newArticle.ID !== "") {
      setNowArticleID(newArticle.ID);
      setNowClassify(newArticle.classify);
    }
  }, [display, newArticle]);

  const handleChoose = (props: IMenuInfo) => {
    if (props.key.length !== 0) {
      if (props.key.startsWith("unique-add-")) {
        const classify = props.key.split("-")[2]; //获取分类
        if (classify === "classify") {
          setIsAddClassifyOpen(true);
        } else {
          setNowClassify(classify);
          setNowArticleID("");
        }
      } else if (props.key.startsWith("unique-edit-")) {
        //编辑分类
        setIsEditClassifyOpen(true);
      } else {
        //选中已存在列表中的文章
        setNowClassify(props.keyPath[1]);
        setNowArticleID(props.key);
      }
    }
  };

  return (
    <>
      <div className="article-layout">
        <Layout className="layout">
          <Sider>
            <Menu
              className="article-list"
              mode="inline"
              items={listArr}
              onClick={handleChoose}
              defaultSelectedKeys={[newArticle.classify]}
              defaultOpenKeys={[newArticle.ID]}
            />
            <Modal
              okText="确认添加"
              cancelText="取消"
              title="添加分类"
              open={isAddClassifyOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              分类名称：
              <Input
                showCount
                maxLength={15}
                onChange={handleEditClassifyChange}
              />
              分类描述：
              <TextArea
                showCount
                rows={4}
                placeholder="maxLength is 200"
                maxLength={200}
                onChange={handleEditClassifyDescribeChange}
              />
            </Modal>
            <Modal
              title="编辑分类"
              open={isEditClassifyOpen}
              onCancel={handleCancel1}
              footer={[]}
              style={{ width: "80vw" }}
            >
              <ClassEdit setDisplay={setDisplay} display={display} />
            </Modal>
          </Sider>

          <Content>
            {nowClassify !== "" ? (
              <ArticleEdit
                classify={nowClassify}
                ID={nowArticleID}
                setNew={setNewArticle}
              />
            ) : (
              <p>请选择文章或添加文章</p>
            )}
          </Content>
        </Layout>
      </div>
    </>
  );
}

interface Item {
  key: string;
  classname: string;
  description: string;
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
          style={{ margin: 8 }}
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
function ClassEdit(props: {
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  display: boolean;
}) {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [oldName, setOldName] = useState<string>("")
  useEffect(() => {
    Service.getClassify().then((res) => {
      const promises = res.data.data.map((i) => {
        const it: Item = {
          key: i.name,
          classname: i.name,
          description: i.description,
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
    console.log(record)
    setOldName(record.key)
    form.setFieldsValue({ classname: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    console.log(key)
    try {
      //索引key就是classname，classname唯一
      const row = (await form.validateFields()) as Item;//as key实际上不包含key，即没有索引值,从这获取更新值
      let newData = [...data];//此时能拿到更新值，但根据索引找到对应行后不是更新值，通过row修改
      const index = newData.findIndex((item) => key === item.key);
      //通过row修改，使其真正的是newData
      newData[index].key = row.classname
      newData[index].classname = row.classname
      newData[index].description = row.description
      if (index > -1) {
        const item = newData[index];
        console.log(item)
        const tempItem: IClassEdit = {
          name: item.classname,
          description: item.description,
          oldname: oldName
        };
        Service.saveClassEdit(tempItem)
          .then((res) => {
            console.log(res)
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            setData(newData);
            setEditingKey("");
            props.setDisplay(!props.display);
          })
          .catch(() => {});
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "classname",
      dataIndex: "classname",
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
              style={{ marginRight: 8 }}
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
            pageSize: 3,
          }}
        />
      </Form>
    </>
  );
}
