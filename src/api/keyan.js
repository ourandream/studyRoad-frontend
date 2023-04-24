import request from "../utils/request";

export const provedelete = (file) => {
  return request({
    url: "/ZongCe/keyan/provedelete",
    method: "get",
    params: {
      file,
    },
  });
};

export const setextrapoint = (stunum, keyanobject) => {
  return request({
    url: "/ZongCe/keyan/setextrapoint",
    method: "post",
    params: { stunum },
    data: keyanobject,
  });
};

export const getauditdetails = (stunum) => {
  return request({
    url: "/ZongCe/keyan/getauditdetails",
    method: "get",
    params: { stunum },
  });
};

export const deleteky = (kyid) => {
  return request({
    url: "/ZongCe/keyan/deleteky",
    method: "get",
    params: { kyid },
  });
};
