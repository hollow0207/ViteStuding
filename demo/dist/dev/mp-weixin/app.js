"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var common_vendor = require("./common/vendor.js");
var mock_index = require("./mock/index.js");
require("./mock/home_mock.js");
require("./mock/user.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/index/index.js";
  "./pages/createAction/createAction.js";
  "./pages/user/user.js";
  "./subpages/detailed/detailed.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      console.log("App Launch");
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/upc/Desktop/ViteStuding/demo/src/App.vue"]]);
mock_index.mockRequest();
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
