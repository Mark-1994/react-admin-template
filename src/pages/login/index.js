import { Form, Input, Button } from 'antd'
import './login.css'
import { getMenu } from '../../api'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  if (localStorage.getItem('token')) {
    return <Navigate to="/home" replace />
  }
  const handleSubmit = values => {
    getMenu(values).then(res => {
      localStorage.setItem('token', res.data.token)
      navigate('/home')
    })
  }
  return (
    <Form className="login-container" onFinish={handleSubmit} labelCol={{ span: 6}} initialValues={{ username: 'admin', password: 'admin' }}>
      <div className="login-title">系统登录</div>
      <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>登录</Button>
      </Form.Item>
    </Form>
  )
}

export default Login
