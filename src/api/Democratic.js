import request from "../utils/request";

export const getClassmate = (stugrade, stuclass, stuname) => {
  return request({
    url: "/ZongCe/democratic/getClassmate",
    method: "get",
    params: {
      stugrade,
      stuclass,
      stuname,
    },
  });
};

export const setDemocratic = (score, scoreed, de) => {
  return request({
    url: "/ZongCe/democratic/setDemocratic",
    method: "post",
    params: {
      score,
      scoreed,
    },
    data: de,
  });
};
