import request from "../utils/request";

export const setscore = (scoreForm) => {
  return request({
    url: "/ZongCe/studies/setscore",
    method: "post",
    data: scoreForm,
  });
};

export const stugetscorelist = (stunum, gradeFind) => {
  return request({
    url: "/ZongCe/studies/stugetscorelist",
    method: "post",
    params: { stunum },
    data: gradeFind,
  });
};

export const teagetscorelist = (scoreFind) => {
  return request({
    url: "/ZongCe/studies/teagetscorelist",
    method: "post",
    data: scoreFind,
  });
};
