import axios from 'axios'

const baseUrl = '/api'

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {}
    }
    return config
  }
  interception (instance, url) {
    instance.interceptors.request.use(config => {
      return config
    }, err => {
      return Promise.reject(err)
    })
    instance.interceptors.response.use(res => {
      const { data } = res
      return data
    }, err => {
      return Promise.reject(err)
    })
  }
  request (options) {
    options = { ...this.getInsideConfig(), ...options }
    const instance = axios.create()
    this.interception(instance)
    return instance(options)
  }
}

const http = new HttpRequest(baseUrl)

export default http
