import { Form, Input, Checkbox, Button, Modal } from 'antd';
import { useState } from 'react';

type PropsType = {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const AddPlaylistForm = ({ open, handleOk, handleCancel }: PropsType) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onOk = () => {
    handleOk();
  };

  const onCancel = () => {
    handleCancel();
  };

  return (
    <Modal
      title="Add a playlist"
      centered
      //disbale on click outside
      maskClosable={false}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" disabled={true} type="primary" onClick={onOk}>
          Submit
        </Button>,
      ]}
    >
      <Form
        name="Add a playlist"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Playlist's URL"
          name="url"
          rules={[{ required: true, message: 'Please input an url!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPlaylistForm;
