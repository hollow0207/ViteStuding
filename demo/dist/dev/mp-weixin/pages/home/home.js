"use strict";
var common_vendor = require("../../common/vendor.js");
var common_assets = require("../../common/assets.js");
if (!Math) {
  (Search + Tag + Selection)();
}
const Search = () => "../../components/Search.js";
const Tag = () => "../../components/Tag.js";
const Selection = () => "../../components/Selection.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "\u6211\u7684\u6D3B\u52A8"
        }),
        b: common_assets._imports_0
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-087d42bb"], ["__file", "C:/Users/upc/Desktop/ViteStuding/demo/src/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
