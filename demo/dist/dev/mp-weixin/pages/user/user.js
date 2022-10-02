"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  UserMsg();
}
const UserMsg = () => "../../components/UserMsg.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "user",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/upc/Desktop/ViteStuding/demo/src/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
