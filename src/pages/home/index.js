import { Col, Row, Card, Table } from 'antd'
import './home.css'
import { getData } from '../../api'
import { useEffect, useState } from 'react'

const columns = [
  {
    title: '课程',
    dataIndex: 'name'
  },
  {
    title: '今日购买',
    dataIndex: 'todayBuy'
  },
  {
    title: '本月购买',
    dataIndex: 'monthBuy'
  },
  {
    title: '总购买',
    dataIndex: 'totalBuy'
  }
]

const Home = () => {
  const userImg = require('../../assets/images/user.png')
  const [data, setData] = useState([])
  useEffect(() => {
    getData().then(res => {
      const { tableData } = res.data
      setData(tableData)
    })
  }, [])
  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
            <img src={userImg} alt="user" />
            <div className="user-info">
              <p className="name">Admin</p>
              <p className="access">超级管理员</p>
            </div>
          </div>
          <div className="login-info">
            <p>上次登录时间：2026-11-13</p>
            <p>上次登录地点：武汉</p>
          </div>
        </Card>
        <Card hoverable>
          <Table rowKey="name" columns={columns} dataSource={data} pagination={false} />
        </Card>
      </Col>
      <Col span={16}></Col>
    </Row>
  )
}

export default Home
