import "./css/comment.css";
import { Avatar, Drawer } from "antd";
import { Comment } from "@ant-design/compatible";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Service } from "../../globe/service";
import { IRootComment } from "../../globe/inter";

function ExampleComment(props: IRootComment) {
  // console.log(props);
  return (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
      author={<div>{props.rootComment.nickname}</div>}
      avatar={
        <Avatar
          icon={<UserOutlined />}
          src={props.rootComment.avator}
          alt={props.rootComment.nickname}
        />
      }
      content={<p>{props.rootComment.body}</p>}
    >
      {/* TODO:have bug when call itself */}
      {/* <ExampleComment>1</ExampleComment> */}
      {/* {props.children !== undefined ? props.children : null} */}
    </Comment>
  );
}
// const ExampleComment: React.FC<{ children?: React.ReactNode }> = ({
//   children,
// }) => (
//   <Comment
//     actions={[<span key="comment-nested-reply-to">Reply to</span>]}
//     author={<a>Han Solo</a>}
//     avatar={
//       <Avatar
//         icon={<UserOutlined />}
//         src="https://joeschmoe.io/api/v1/random"
//         alt="Han Solo"
//       />
//     }
//     content={
//       <p>
//         We supply a series of design principles, practical patterns and high
//         quality design resources (Sketch and Axure).
//       </p>
//     }
//   >
//     {children}
//   </Comment>
// );

export function CommentPage(props: { articleId: string | null }) {
  const [open, setOpen] = useState(false);
  const [rootComment, setRootComment] = useState<IRootComment[]>();
  const onClose = () => {
    setOpen(false);
  };
  const articleId_ = props.articleId === null ? "" : props.articleId;
  useEffect(() => {
    Service.getComment(articleId_).then((res) => {
      // const promises = res.data.data;
      // console.log(res.data.data);
      setRootComment(res.data.data);
      // console.log(rootComment);
      // Promise.all(promises).then((res_) => {
      //   console.log(res_)
      //   setRootComment(res_);
      //   console.log(rootComment)
      // });
    });
  }, [articleId_]);

  return (
    <>
      <div className="comment-display">
        {rootComment === undefined ? (
          <div style={{fontSize:"medium"}}>暂无评论</div>
        ) : (
          rootComment.map((aRootComment) => {
            // console.log(aRootComment);
            return (
              <>
                <ExampleComment
                  rootComment={aRootComment.rootComment}
                  reply={aRootComment.reply}
                />
              </>
            );
          })
        )}
        {/* <ExampleComment rootComment={rootComment} reply={[]} /> */}
      </div>
      <div className="comment-add">
        <Button onClick={() => setOpen(true)}>发表评论</Button>
      </div>
      <Drawer title="发表评论" placement="right" onClose={onClose} open={open}>
        <AddComment />
      </Drawer>
    </>
  );
}

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function AddComment() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
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
      <Form.Item name="nickname" label="nickname" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="isBlogger" label="作者key" rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name="comment" label="comment" rules={[{ required: true }]}>
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
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
