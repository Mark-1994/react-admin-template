import React from 'react'
import * as Icon from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import MenuConfig from '../../config'
import { useNavigate } from  'react-router-dom'

const { Sider } = Layout

// 动态获取icon
const iconToElement = (name) => React.createElement(Icon[name])

// 处理菜单的数据
const items = MenuConfig.map((item) => {
  return {
    key: item.path,
    icon: iconToElement(item.icon),
    label: item.label,
    children: item.children?.map((child) => {
      return {
        key: child.path,
        icon: iconToElement(child.icon),
        label: child.label,
      }
    }),
  }
})

const CommonAside = ({ collapsed }) => {
  const navigate = useNavigate()
  const selectMenu = (item) => {
    navigate(item.key)
  }
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <h3 className="app-name">{collapsed ? '后台' : '通用后台管理系统'}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        style={{
          height: '100%'
        }}
        onClick={selectMenu}
      />
    </Sider>
  )
}

export default CommonAside
