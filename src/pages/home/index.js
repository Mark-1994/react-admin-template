import { Col, Row, Card, Table } from 'antd'
import './home.css'
import { getData } from '../../api'
import React, { useEffect, useState } from 'react'
import * as Icon from '@ant-design/icons'
import CustomChart from '../../components/Echarts'

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
const countData = [
  {
    "name": "今日支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "今日收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "今日未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  },
  {
    "name": "本月支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "本月收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "本月未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  }
]
const iconToElement = (name) => React.createElement(Icon[name])
const Home = () => {
  const userImg = require('../../assets/images/user.png')
  const [data, setData] = useState([])
  const [echartData, setEchartData] = useState({})
  useEffect(() => {
    getData().then(res => {
      const { tableData, orderData, userData, videoData } = res.data
      setData(tableData)
      const keyArray = Object.keys(orderData.data[0])
      const series = keyArray.map(key => {
        return {
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        }
      })
      setEchartData({
        order: {
          xAxisData: orderData.date,
          series
        },
        user: {
          xAxisData: userData.map(item => item.date),
          series: [
            {
              name: '新增用户',
              data: userData.map(item => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: userData.map(item => item.active),
              type: 'bar'
            }
          ]
        },
        video: {
          series: [
            {
              data: videoData,
              type: 'pie'
            }
          ]
        },
      })
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
      <Col span={16}>
        <div className="num">
          {countData.map((item, index) => (
            <Card key={index}>
              <div className="icon-box" style={{ backgroundColor: item.color }}>
                { iconToElement(item.icon) }
              </div>
              <div className="detail">
                <p className="num-value">￥{item.value}</p>
                <p className="num-name">{item.name}</p>
              </div>
            </Card>
          ))}
        </div>
        { echartData.order && <CustomChart chartData={echartData.order} style={{ height: '280px' }} /> }
        <div className="graph">
          { echartData.user && <CustomChart chartData={echartData.user} style={{ height: '240px', width: '50%' }} /> }
          { echartData.video && <CustomChart chartData={echartData.video} isAxisChart={false} style={{ height: '240px', width: '50%' }} /> }
        </div>
      </Col>
    </Row>
  )
}

export default Home
