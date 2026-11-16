
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Layout, Button, Avatar, theme, Dropdown } from 'antd'
import './index.css'
import { useDispatch } from 'react-redux'
import { toggleCollapse } from '../../store/reducers/tab'
import { useNavigate } from 'react-router-dom'

const { Header } = Layout;

const CommonHeader = ({ collapsed }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  const items = [
    {
      key: '1',
      label: (
        <div>
          个人中心
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={logout}>
          退出
        </div>
      ),
    }
  ]
  // 展开收起侧边栏
  const setCollapsed = () => {
    dispatch(toggleCollapse())
  }
  return (
    <Header style={{ padding: '0 24px 0 0', background: colorBgContainer }} className="header-container">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={setCollapsed}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Dropdown menu={{ items }}>
        <Avatar size={36} src={<img src={require("../../assets/images/user.png")} alt="avatar" />} />
      </Dropdown>
    </Header>
  )
}

export default CommonHeader
