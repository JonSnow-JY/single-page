import request from "plugin/axios";

const BASE_URL = "agent";

export function getLayout() {
  return request({
    url: BASE_URL + "/layout/getLayout",
    method: "get",
  });
}

export function addLayout(data) {
  return request({
    url: BASE_URL + "/layout/layout_post",
    method: "post",
    data,
  });
}
