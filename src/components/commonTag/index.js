import { Tag, Space } from 'antd'
import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { closeTag, setCurrentMenu } from '../../store/reducers/tab'
import { useLocation, useNavigate } from 'react-router-dom'

const ConnonTag = () => {
  const { tabList, currentMenu } = useSelector(state => state.tab)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const preventDefault = (item, index) => {
    const lenIndex = tabList.length - 1
    dispatch(closeTag(item, index))
    // 关闭的不是当前tag
    if (item.path !== location.pathname) {
      return
    }
    if (index === lenIndex) {
      dispatch(setCurrentMenu(tabList[lenIndex - 1]))
      navigate(tabList[lenIndex - 1].path)
    } else {
      if (tabList.length > 1) {}
      dispatch(setCurrentMenu(tabList[index + 1]))
      navigate(tabList[index + 1].path)
    }
  }
  // 点击标签切换页面
  const handleChange = (item) => {
    dispatch(setCurrentMenu(item))
    navigate(item.path)
  }
  // 渲染标签 flag 是否选中 item 标签数据 index 标签下标
  const setTag = (flag, item, index) => {
    return (flag ? (
      <Tag key={item.path} color="#55acee" closeIcon onClose={() => preventDefault(item, index)}>
        {item.label}
      </Tag>
    ) : (
      <Tag key={item.path} onClick={() => handleChange(item)}>
        {item.label}
      </Tag>
    ))
  }
  return (
    <Space className="common-tag" size={[0, 8]} wrap>
      {/* <Tag>首页</Tag>
      <Tag color="#55acee" closeIcon onClose={preventDefault}>用户列表</Tag> */}
      {currentMenu.name && tabList.map((item, index) => setTag(item.path === currentMenu.path, item, index))}
    </Space>
  )
}

export default ConnonTag
