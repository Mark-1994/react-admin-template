import { createSlice } from '@reduxjs/toolkit'

const tabSlice = createSlice({
  name: 'tab',
  // 初始化状态
  initialState: {
    isCollapse: false, // 是否折叠侧边栏
    tabList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
      }
    ],
    currentMenu: {}
  },
  reducers: {
    // 折叠侧边栏
    toggleCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenuList(state, { payload: val }) {
      if (val.name !== 'home') {
        state.currentMenu = val
        const index = state.tabList.findIndex(item => item.name === val.name)
        if (index === -1) {
          state.tabList.push(val)
        }
      } else {
        state.currentMenu = {}
      }
    },
    closeTag(state, { payload: val }) {
      const index = state.tabList.findIndex(item => item.name === val.name)
      state.tabList.splice(index, 1)
    },
    setCurrentMenu(state, { payload: val }) {
      if (val.name !== 'home') {
        state.currentMenu = val
      } else {
        state.currentMenu = {}
      }
    }
  }
})

export const { toggleCollapse, selectMenuList, closeTag, setCurrentMenu } = tabSlice.actions // actions 包含所有 reducer 的方法
export default tabSlice.reducer
