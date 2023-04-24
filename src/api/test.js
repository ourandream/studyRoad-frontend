import request from '../utils/request'

export const Findbooks=()=>{
  return request({
    url:"/ZongCe/student/all",
    method:'get'
  })
}
