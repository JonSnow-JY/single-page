import request from "plugin/axios";

const BASE_URL = "index/user";

export function logOut() {
  return request({
    url: BASE_URL + "/login_out",
    method: "post",
  });
}

export function updatePassword(data) {
  return request({
    url: BASE_URL + "/updatePassword",
    method: "post",
    data,
  });
}
