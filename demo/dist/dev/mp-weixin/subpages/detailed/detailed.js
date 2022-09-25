"use strict";
var common_vendor = require("../../common/vendor.js");
var common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.js";
if (!Math) {
  (Tag + _easycom_uni_forms_item + _easycom_uni_forms + MemberList)();
}
const Tag = () => "../../components/Tag.js";
const MemberList = () => "../../components/MemberList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detailed",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "\u6BD4\u8D5B\u8BE6\u60C5"
        }),
        b: common_assets._imports_0$1,
        c: common_assets._imports_1,
        d: common_assets._imports_2,
        e: common_assets._imports_3,
        f: common_assets._imports_4,
        g: common_vendor.p({
          title: "\u53C2\u4E0E\u6210\u5458"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e03db806"], ["__file", "C:/Users/upc/Desktop/ViteStuding/demo/src/subpages/detailed/detailed.vue"]]);
wx.createPage(MiniProgramPage);
