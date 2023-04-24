import request from "../utils/request";

export const provedelete = (file) => {
  return request({
    url: "/ZongCe/yiti/provedelete",
    method: "get",
    params: {
      file,
    },
  });
};

export const setextrapoint = (stunum, yitiobject) => {
  return request({
    url: "/ZongCe/yiti/setextrapoint",
    method: "post",
    params: { stunum },
    data: yitiobject,
  });
};

export const getauditdetails = (stunum) => {
  return request({
    url: "/ZongCe/yiti/getauditdetails",
    method: "get",
    params: { stunum },
  });
};

export const deleteyt = (ytid) => {
  return request({
    url: "/ZongCe/yiti/deleteyt",
    method: "get",
    params: { ytid },
  });
};
