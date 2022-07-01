import Cookies from "js-cookie";

const cookies = {};

cookies.set = function (name = "default", value = "", cookieSetting = {}) {
  let currentCookieSetting = {
    expires: 1,
  };
  Object.assign(currentCookieSetting, cookieSetting);
  Cookies.set(
    `ns-${process.env.VUE_APP_VERSION}-${name}`,
    value,
    currentCookieSetting
  );
};

cookies.get = function (name = "default") {
  return Cookies.get(`ns-${process.env.VUE_APP_VERSION}-${name}`);
};

cookies.remove = function (name = "default") {
  return Cookies.remove(`ns-${process.env.VUE_APP_VERSION}-${name}`);
};

export default cookies;
