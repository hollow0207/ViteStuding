"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const title = common_vendor.ref("Hello");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(title.value),
        b: common_vendor.p({
          title: "\u57FA\u7840\u5361\u7247",
          extra: "\u989D\u5916\u4FE1\u606F"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/upc/Desktop/ViteStuding/demo/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
