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

// 获取全部频道列表
export const RecommendedChannelRecommendation = () => {
  return request({
    method: 'get',
    url: '/v1_0/channels'
  })
}

// 添加用户频道(参数要添加的id和添加完之后的长度)
export const addUserchannel = (channel) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
// 删除频道列表(参数为要删除的id)
export const deleteuserChannlId = (channlId) => {
  return request({
    method: 'delete',
    url: `/v1_0/user/channels/${channlId}`
  })
}

// 获取搜索结果
export const SearchResults = (params) => {
  return request({
    method: 'get',
    url: '/v1_0/search',
    params
  })
}

// 获取联想建议
export const LenovoSuggestion = (q) => {
  return request({
    method: 'get',
    url: '/v1_0/suggestion',
    params: {
      q: q
    }
  })
}

// 获取文章详情的接口
export const ArticleInterface = (articleid) => {
  return request({
    method: 'get',
    url: `/v1_0/articles/${articleid}`
  })
}

/**
 * 添加关注
 */
export const addFollow = (userId) => {
  return request({
    method: 'POST',
    url: 'v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollow = (userId) => {
  return request({
    method: 'DELETE',
    url: `v1_0/user/followings/${userId}`
  })
}

/**
 * 收藏文章
 */
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 */
export const deleteCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

// 点赞文章
export const Likenuw = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

/**
 * 取消点赞文章
 */
export const Cancel = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}

// 获取文章评论
export const ArticleComment = (params) => {
  return request({
    method: 'get',
    url: '/v1_0/comments',
    params
  })
}

/**
 * 添加评论或评论回复
 */
export function addComment (data) {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
