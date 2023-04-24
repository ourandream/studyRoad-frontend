import request from "../utils/request";

export const provedelete = (file) => {
  return request({
    url: "/ZongCe/takeoffice/provedelete",
    method: "get",
    params: {
      file,
    },
  });
};

export const setextrapoint = (stunum, postobject) => {
  return request({
    url: "/ZongCe/takeoffice/setextrapoint",
    method: "post",
    params: { stunum },
    data: postobject,
  });
};

export const getauditdetails = (stunum) => {
  return request({
    url: "/ZongCe/takeoffice/getauditdetails",
    method: "get",
    params: { stunum },
  });
};

export const deleterz = (rzid) => {
  return request({
    url: "/ZongCe/takeoffice/deleterz",
    method: "get",
    params: { rzid },
  });
};

export const stuperList = (perUser) => {
  return request({
    url: "/ZongCe/teacher/stuperlist",
    method: "post",
    data: perUser,
  });
};

export const unstuperList = (inperuser) => {
  return request({
    url: "/ZongCe/teacher/unstuperlist",
    method: "post",
    data: inperuser,
  });
};

export const delStuper = (stu) => {
  return request({
    url: "/ZongCe/teacher/delstuper",
    method: "get",
    params: stu,
  });
};
export const addStuper = (stu) => {
  return request({
    url: "/ZongCe/teacher/addstuper",
    method: "get",
    params: stu,
  });
};
