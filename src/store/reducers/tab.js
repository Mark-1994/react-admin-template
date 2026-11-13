import { createSlice } from '@reduxjs/toolkit'

const tabSlice = createSlice({
  name: 'tab',
  // 初始化状态
  initialState: {
    isCollapse: false // 是否折叠侧边栏
  },
  reducers: {
    // 折叠侧边栏
    toggleCollapse(state) {
      state.isCollapse = !state.isCollapse
    }
  }
})

export const { toggleCollapse } = tabSlice.actions // actions 包含所有 reducer 的方法
export default tabSlice.reducer
