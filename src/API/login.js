import request from '../utils/require.js'
// 登录请求
export const login = (data1) => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data: data1
  })
}
// 获取验证码
export const sendSms = (mobile) => {
  return request({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户自己的数据
export const getuserInfo = () => {
  return request({
    method: 'get',
    url: 'v1_0/user'
    // 请求参数headers
    // 用户令牌token，必传
  })
}

// 获取用户自己的数据
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: 'v1_0/user/channels'
  })
}

// 频道新闻推荐 v1.0
export const ChannelNewsRecommendation = (params) => {
  return request({
    method: 'get',
    url: '/v1_0/articles',
    params
  })
}

// 获取搜索结果
export const SearchResults = (q) => {
  return request({
    method: 'get',
    url: '/v1_0/search',
    params: {
      q: q
    }
  })
}

// 获取全部频道列表
export const RecommendedChannelRecommendation = () => {
  return request({
    method: 'get',
    url: '/v1_0/channels'
  })
}

// 添加用户频道(参数要添加的id和添加完之后的长度)
export const addUserchannel = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
// 删除频道列表(参数为要删除的id)
export const deleteuserChannlId = channlId => {
  return request({
    method: 'delete',
    url: `/v1_0/user/channels/${channlId}`
  })
}
