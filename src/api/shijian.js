import request from '../utils/request'

export const provedelete= (file) => {
  return request({
    url: "/ZongCe/shijian/provedelete",
    method: 'get',
    params: {
      file
    }
  })
}

export const setextrapoint= (stunum,shijianobject) => {
  return request({
    url: "/ZongCe/shijian/setextrapoint",
    method: 'post',
    params: { stunum },
    data:shijianobject
  })
}

export const getauditdetails= (stunum) => {
  return request({
    url: "/ZongCe/shijian/getauditdetails",
    method: 'get',
    params: { stunum }
  })
}

export const deletesj= (sjid) => {
  return request({
    url: "/ZongCe/shijian/deletesj",
    method: 'get',
    params: { sjid }
  })
}

