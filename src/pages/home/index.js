import { Col, Row, Card } from 'antd'
import './home.css'

const Home = () => {
  const userImg = require('../../assets/images/user.png')
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
      </Col>
      <Col span={16}></Col>
    </Row>
  )
}

export default Home
