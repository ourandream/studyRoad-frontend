import request from '../utils/request'

export const provedelete= (file) => {
  return request({
    url: "/ZongCe/sixiang/provedelete",
    method: 'get',
    params: {
      file
    }
  })
}

export const setextrapoint= (stunum,behavior) => {
  return request({
    url: "/ZongCe/sixiang/setextrapoint",
    method: 'post',
    params: { stunum },
    data:behavior
  })
}


export const getauditdetails= (stunum) => {
  return request({
    url: "/ZongCe/sixiang/getauditdetails",
    method: 'get',
    params: { stunum }
  })
}

export const deletesx= (sxid) => {
  return request({
    url: "/ZongCe/sixiang/deletesx",
    method: 'get',
    params: { sxid }
  })
}
