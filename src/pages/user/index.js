import { Button, Form, Input } from 'antd'
import './user.css'

const User = () => {
  const handleClick = (type) => {
    console.log(type)
  }
  const handleFinish = (values) => {
    console.log(values)
  }
  return (
    <div className="user">
      <div className="flex-box space-between">
        <Button type="primary" onClick={() => handleClick('add')}>+新增</Button>
        <Form layout="inline" onFinish={handleFinish}>
          <Form.Item name="keyword">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">搜索</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default User
