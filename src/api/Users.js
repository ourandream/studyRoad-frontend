import request from "../utils/request";

export const Findstudent = (user) => {
  return request({
    url: "/ZongCe/student/findstu",
    method: "get",
    params: user,
  });
};

export const Findteacher = (user) => {
  return request({
    url: "/ZongCe/teacher/findtea",
    method: "get",
    params: user,
  });
};

export const Findstulist = (current, size, num, name, sex, grade, major) => {
  return request({
    url: "/ZongCe/student/findstulist",
    method: "get",
    params: {
      current,
      size,
      num,
      name,
      sex,
      grade,
      major,
    },
  });
};

export const deleteImgFile = (file, id, head) => {
  return request({
    url: "/ZongCe/student/deleteHead",
    method: "get",
    params: {
      file,
      id,
      head,
    },
  });
};

export const changeStuinfo = (student) => {
  return request({
    url: "/ZongCe/student/changeStuinfo",
    method: "get",
    params: student,
  });
};

export const changeTeainfo = (teacher) => {
  return request({
    url: "/ZongCe/teacher/changeTeainfo",
    method: "get",
    params: teacher,
  });
};

export const changeStupa = (painfo) => {
  return request({
    url: "/ZongCe/student/changeStupa",
    method: "get",
    params: painfo,
  });
};

export const changeTeapa = (changePs) => {
  return request({
    url: "/ZongCe/teacher/changeTeapa",
    method: "get",
    params: changePs,
  });
};

export const getstulist = (stunum, stuname, stugrade) => {
  return request({
    url: "/ZongCe/student/getstulist",
    method: "get",
    params: { stunum, stuname, stugrade },
  });
};

export const stuforgetpa = (forgetdata) => {
  return request({
    url: "/ZongCe/student/forgetpa",
    method: "post",
    data: forgetdata,
  });
};

export const teaforgetpa = (forgetdata) => {
  return request({
    url: "/ZongCe/teacher/forgetpa",
    method: "post",
    data: forgetdata,
  });
};

export const registerstu = (registerData) => {
  return request({
    url: "/ZongCe/student/register",
    method: "post",
    data: registerData,
  });
};

export const deleteStu = (stu) => {
  return request({
    url: "/ZongCe/student/deletestu",
    method: "get",
    params: stu,
  });
};

export const modifyStu = (stuUser) => {
  return request({
    url: "/ZongCe/student/modifystu",
    method: "get",
    params: stuUser,
  });
};

export const teaaddStu = (stuUseradd) => {
  return request({
    url: "/ZongCe/student/teaaddstu",
    method: "get",
    params: stuUseradd,
  });
};

export const reducePoint = (teauser, deductForm) => {
  return request({
    url: "/ZongCe/teacher/reducepoint",
    method: "post",
    data: [teauser, deductForm],
  });
};

export const teagetdepointList = (depointFind) => {
  return request({
    url: "/ZongCe/teacher/teagetdepointlist",
    method: "post",
    data: depointFind,
  });
};

export const stugetdepointList = (stuuser) => {
  return request({
    url: "/ZongCe/student/stugetdepointlist",
    method: "post",
    data: stuuser,
  });
};

export const teagetdaishenheList = (daishenFind) => {
  return request({
    url: "/ZongCe/teacher/teagetdaishenhelist",
    method: "post",
    data: daishenFind,
  });
};

export const teaTongguo = (teauser, tongguo) => {
  return request({
    url: "/ZongCe/teacher/teatongguo",
    method: "post",
    data: [teauser, tongguo],
  });
};

export const teaButongguo = (recom, teauser, tongguo) => {
  return request({
    url: "/ZongCe/teacher/teabutongguo",
    method: "post",
    params: { recom },
    data: [teauser, tongguo],
  });
};

export const teagetyishenheList = (yishenFind) => {
  return request({
    url: "/ZongCe/teacher/teagetyishenhelist",
    method: "post",
    data: yishenFind,
  });
};

export const stugetdaishenheList = (stuuser) => {
  return request({
    url: "/ZongCe/teacher/stugetdaishenhelist",
    method: "post",
    data: stuuser,
  });
};

export const stuTongguo = (stuuser, tongguo) => {
  return request({
    url: "/ZongCe/teacher/stutongguo",
    method: "post",
    data: [stuuser, tongguo],
  });
};

export const stuButongguo = (recom, stuuser, tongguo) => {
  return request({
    url: "/ZongCe/teacher/stubutongguo",
    method: "post",
    params: { recom },
    data: [stuuser, tongguo],
  });
};

export const stugetyishenheList = (stuuser) => {
  return request({
    url: "/ZongCe/teacher/stugetyishenhelist",
    method: "post",
    data: stuuser,
  });
};
