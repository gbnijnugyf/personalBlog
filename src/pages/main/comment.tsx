import "./css/comment.css";
import { Avatar, Drawer, message } from "antd";
import { Comment } from "@ant-design/compatible";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Service } from "../../globe/service";
import { IComment, IRootComment } from "../../globe/inter";

interface IExampleComment {
  comment: IRootComment;
  setFunc: React.Dispatch<
    React.SetStateAction<{
      id: string;
      nickName: string;
    }>
  >;
  openFunc: React.Dispatch<React.SetStateAction<boolean>>;
}
function ExampleComment(props: IExampleComment) {
  // console.log(props);
  props.comment.reply.sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    return timeB - timeA; // 时间晚的在前面
  });

  function handleReply(pre: ISetPreID) {
    props.setFunc(pre);
    props.openFunc(true);
  }

  return (
    <Comment
      actions={[
        <span
          key="comment-nested-reply-to"
          onClick={() => {
            const temp: ISetPreID = {
              //TODO:null检查
              id: props.comment.rootComment.commentID as string,
              nickName: props.comment.rootComment.nickname,
            };
            handleReply(temp);
          }}
        >
          回复
        </span>,
      ]}
      author={
        <div>
          {props.comment.rootComment.nickname} {props.comment.rootComment.time}
        </div>
      }
      avatar={
        <Avatar
          icon={<UserOutlined />}
          src={props.comment.rootComment.avator}
          alt={props.comment.rootComment.nickname}
        />
      }
      content={<p>{props.comment.rootComment.body}</p>}
    >
      {/* TODO:have bug when call itself */}
      {props.comment.reply.map((item) => {
        let preNickName: string = "";
        if (item.preID !== null) {
          const foundPerson = props.comment.reply.find(
            (it) => it.commentID === item.preID
          );
          if (foundPerson !== undefined) {
            preNickName = foundPerson.nickname;
          }
        }

        return (
          <Comment
            actions={[
              <span
                key="comment-nested-reply-to"
                onClick={() => {
                  const temp: ISetPreID = {
                    //TODO:null检查
                    id: item.commentID as string,
                    nickName: item.nickname,
                  };
                  handleReply(temp);
                }}
              >
                回复
              </span>,
            ]}
            author={
              <div>
                {item.nickname}
                {preNickName !== "" ? ` 回复 ${preNickName}` : null} {item.time}
              </div>
            }
            avatar={
              <Avatar
                icon={<UserOutlined />}
                src={props.comment.rootComment.avator}
                alt={props.comment.rootComment.nickname}
              />
            }
            content={item.body}
          />
        );
      })}
    </Comment>
  );
}
interface ISetPreID {
  id: string;
  nickName: string;
}
export function CommentPage(props: { articleId: string | null }) {
  const preIDInit: ISetPreID = {
    id: "",
    nickName: "",
  };
  const [open, setOpen] = useState(false);
  const [rootComment, setRootComment] = useState<IRootComment[]>();
  const [preId, setPreId] = useState<ISetPreID>(preIDInit);
  const onClose = () => {
    setOpen(false);
  };
  const articleId_ = props.articleId === null ? "" : props.articleId;
  useEffect(() => {
    Service.getComment(articleId_).then((res) => {
      setRootComment(res.data.data);
    });
  }, [articleId_]);

  return (
    <>
      <div className="comment-display">
        {rootComment === undefined ? (
          <div style={{ fontSize: "medium" }}>暂无评论</div>
        ) : (
          rootComment.map((aRootComment) => {
            // console.log(aRootComment);
            const temp: IRootComment = {
              rootComment: aRootComment.rootComment,
              reply: aRootComment.reply,
            };
            return (
              <ExampleComment
                comment={temp}
                setFunc={setPreId}
                openFunc={setOpen}
              />
            );
          })
        )}
      </div>
      <div className="comment-add">
        <Button
          onClick={() => {
            setPreId(preIDInit);
            setOpen(true);
          }}
        >
          发表评论
        </Button>
      </div>
      <Drawer
        title={preId.id !== "" ? `回复${preId.nickName}` : "发表评论"}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <AddComment pre={preId} articleID={articleId_} setOpen={setOpen} />
      </Drawer>
    </>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface IAddComment {
  pre: ISetPreID;
  articleID: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddComment(props: IAddComment) {
  const [form] = Form.useForm();
  console.log(props.pre);
  interface IOnFinish {
    email: string;
    nickname: string;
    comment: string;
  }
  const onFinish = (values: IOnFinish) => {
    console.log(values);
    const commentValue: IComment = {
      avator: null,
      commentID: null,
      email: values.email,
      isBlogger: null,
      nickname: values.nickname,
      preID: props.pre.id !== "" ? props.pre.id : null,
      primary: props.articleID,
      time: "",
      body: values.comment,
    };
    Service.publishComment(commentValue)
      .then((res) => {
        console.log(res);
        success();
        props.setOpen(false);
      })
      .catch(() => {
        error();
      });
  };

  const onReset = () => {
    form.resetFields();
  };
  const [messageApi, contextHolder] = message.useMessage();
  function success(text: string = "评论成功") {
    messageApi.open({
      type: "success",
      content: text,
    });
  }
  function error(text: string = "评论失败，请重试") {
    messageApi.open({
      type: "error",
      content: text,
    });
  }
  return (
    <>
      {contextHolder}
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="email"
          label="email"
          rules={[
            { required: true },
            {
              pattern:
                /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
              message: "邮箱格式不正确",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="nickname" label="昵称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="comment" label="评论内容" rules={[{ required: true }]}>
          <TextArea
            showCount
            rows={4}
            placeholder="maxLength is 200"
            maxLength={200}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
