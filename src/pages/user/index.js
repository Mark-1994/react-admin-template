import { Button, Form, Input, Table, Space, Popconfirm, Modal, InputNumber, Select, DatePicker } from 'antd'
import './user.css'
import { useEffect, useState, useCallback } from 'react'
import { getUser, addUser, editUser, delUser } from '../../api'
import dayjs from 'dayjs'

const User = () => {
  const [userList, setUserList] = useState([])
  const [total, setTotal] = useState(0)
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 20
  })
  const [listData, setListData] = useState({
    name: ''
  })
  // 0 新增 1 编辑
  const [ modalType, setModalType ] = useState(0)
  const [visible, setVisible] = useState(false)
  const handleClick = (type, rowData) => {
    if (type === 'add') {
      setModalType(0)
      setVisible(true)
    } else if (type === 'edit') {
      setModalType(1)
      setVisible(true)
      const cloneData = JSON.parse(JSON.stringify(rowData))
      cloneData.birth = dayjs(rowData.birth)
      form.setFieldsValue(cloneData)
    } else if (type === 'delete') {
      delUser({ id: rowData.id }).then(() => {
        getTableData()
      })
    }
  }
  const handleOk = () => {
    form.validateFields().then(async val => {
      val.birth = val.birth.format('YYYY-MM-DD')
      if (modalType === 0) {
        await addUser(val)
      } else {
        await editUser(val)
      }
      getTableData()
      handleCancel()
    }).catch(err => {})
  }
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }
  const handleFinish = (values) => {
    setPageParams(data => ({
      ...data,
      page: 1
    }))
    setListData(data => ({
      ...data,
      ...values
    }))
  }
  const getTableData = useCallback(() => {
    setLoading(true)
    getUser({
      ...listData,
      ...pageParams
    }).then((res) => {
      setUserList(res.list)
      setTotal(res.count)
    }).finally(() => setLoading(false))
  }, [listData, pageParams])
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: (text) => {
        if (text === 1) {
          return '男'
        } else {
          return '女'
        }
      }
    },
    {
      title: '出生日期',
      dataIndex: 'birth'
    },
    {
      title: '地址',
      dataIndex: 'addr'
    },
    {
      title: '操作',
      render: (rowData) => (
        <Space>
          <Button type="primary" onClick={() => handleClick('edit', rowData)}>编辑</Button>
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => handleClick('delete', rowData)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" danger>删除</Button>
          </Popconfirm>
        </Space>
      )
    }
  ]
  useEffect(() => {
    getTableData()
  }, [getTableData])
  // antd 表单提供的创建Form实例的方法
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  return (
    <div className="user">
      <div className="flex-box space-between">
        <Button type="primary" onClick={() => handleClick('add')}>+新增</Button>
        <Form layout="inline" onFinish={handleFinish}>
          <Form.Item name="name">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">搜索</Button>
          </Form.Item>
        </Form>
      </div>
      {/* 截取最多 pageSize 条，保证永远不会大于 pageSize，避免从大条数切到小条数时 antd 报错 */}
      <Table columns={columns} dataSource={userList.slice(0, pageParams.limit)} rowKey="id" pagination={{ total, pageSize: pageParams.limit, current: pageParams.page }} onChange={(page) => {
        setPageParams({
          page: page.current,
          limit: page.pageSize
        })
      }} loading={loading} style={{ marginTop: 10 }} />
      <Modal
        title={ modalType === 0 ? '新增用户' : '编辑用户' }
        open={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} labelCol={{ span: 4 }}>
          {modalType === 1 && (
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
          )}
          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item label="年龄" name="age" rules={[{ required: true, message: '请输入年龄' }]}>
            <InputNumber placeholder="请输入年龄" min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="性别" name="sex" rules={[{ required: true, message: '请选择性别' }]}>
            <Select options={[ { value: 1, label: '男' }, { value: 0, label: '女' } ]} placeholder="请选择性别" />
          </Form.Item>
          <Form.Item label="出生日期" name="birth" rules={[{ required: true, message: '请选择出生日期' }]}>
            <DatePicker placeholder="请选择出生日期" format="YYYY-MM-DD" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="地址" name="addr" rules={[{ required: true, message: '请输入地址' }]}>
            <Input placeholder="请输入地址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default User
