import { FolderOpenOutlined } from '@ant-design/icons';
import { Form, Input, Button, Modal, Select, Space, Card } from 'antd';
import Meta from 'antd/es/card/Meta';

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
      //disable on click outside
      maskClosable={false}
      destroyOnClose={true}
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
        initialValues={{ remember: true, path: './', format: 'mp3' }}
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
        <Form.Item name="info">
          <Card
            hoverable
            style={{ width: '100%' }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            <Meta
              title={'Uploader : ' + 'UPLOADER NAME'}
              description={'Uploader URL : ' + 'UPLOADER URL'}
            />
          </Card>
        </Form.Item>
        <Form.Item name="path">
          <Space>
            <Input style={{ width: 300 }} defaultValue={'./'} />
            <Button icon={<FolderOpenOutlined />} />
          </Space>
        </Form.Item>
        <Form.Item name="format">
          <Select style={{ width: 80 }}>
            <Select.Option value="aac">aac</Select.Option>
            <Select.Option value="flac">flac</Select.Option>
            <Select.Option value="m4a">m4a</Select.Option>
            <Select.Option value="mp3">mp3</Select.Option>
            <Select.Option value="opus">opus</Select.Option>
            <Select.Option value="ogg">ogg</Select.Option>
            <Select.Option value="wav">wav</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPlaylistForm;
