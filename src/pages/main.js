import { Outlet } from 'react-router-dom'
import { Layout, theme } from 'antd';
import CommonAside from '../components/commonAside'
import CommonHeader from '../components/commonHeader'
import { useSelector } from 'react-redux'
import CommonTag from '../components/commonTag'
import RouterAuth from '../router/routerAuth'

const { Content } = Layout;

const Main = () => {
  // 获取展开收起的状态
  const collapsed = useSelector(state => state.tab.isCollapse) // tab 为 reducers 中的 key
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  return (
    <RouterAuth>
      <Layout className="main-container">
        <CommonAside collapsed={collapsed} />
        <Layout>
          <CommonHeader collapsed={collapsed} />
          <CommonTag />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </RouterAuth>
  )
}

export default Main
