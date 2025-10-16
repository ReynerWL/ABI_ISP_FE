import { config } from '#/config/app'
import superagent from 'superagent'
// @ts-ignore
import superagentIntercept from 'superagent-intercept'
import { attachSuperagentLogger } from './http_logger'
import { TokenUtil } from './token'

let AuthIntercept = superagentIntercept((err: any, res: any) => {
  if (res && res.status === 401) {
    console.log('AuthIntercept 401')
    TokenUtil.clearTokens()
    TokenUtil.persistToken()

    const publicPath = ['/beranda', '/login', '/register']
    const currentPath = window.location.href

    if (!publicPath.includes(currentPath)) {
      window.location.href = '/beranda'
    }
  }
})

export const http = {
  get: (url: string, opts = {}) => {
    let req = superagent
      .get(config.baseUrl + url)
      .use(AuthIntercept)
      .use(attachSuperagentLogger)

    if (TokenUtil.accessToken) {
      req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken)
    }

    return req
  },

  post: (url: string, opts = {}) => {
    let req = superagent
      .post(config.baseUrl + url)
      .use(AuthIntercept)
      .use(attachSuperagentLogger)

    if (TokenUtil.accessToken) {
      req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken)
    }
    return req
  },

  put: (url: string, opts = {}) => {
    let req = superagent
      .put(config.baseUrl + url)
      .use(AuthIntercept)
      .use(attachSuperagentLogger)

    if (TokenUtil.accessToken) {
      req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken)
    }

    return req
  },

  del: (url: string, opts = {}) => {
    let req = superagent
      .del(config.baseUrl + url)
      .use(AuthIntercept)
      .use(attachSuperagentLogger)

    if (TokenUtil.accessToken) {
      req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken)
    }
    return req
  },

  fetcher: async (url: string) => {
    let req = superagent
      .get(config.baseUrl + url)
      .use(AuthIntercept)
      .use(attachSuperagentLogger)

    if (TokenUtil.accessToken) {
      req = req.set('Authorization', 'Bearer ' + TokenUtil.accessToken)
    }

    const resp = await req
    return resp.body
  }
}
