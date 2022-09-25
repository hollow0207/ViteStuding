"use strict";
var common_vendor = require("../../common/vendor.js");
var common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_data_select2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_tag2 + _easycom_uni_forms2)();
}
const _easycom_uni_data_select = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-data-select/uni-data-select.js";
const _easycom_uni_forms_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.js";
const _easycom_uni_tag = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag.js";
const _easycom_uni_forms = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_tag + _easycom_uni_forms)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "createAction",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.p({
          placeholder: "\u8BF7\u9009\u62E9\u6D3B\u52A8\u8FDB\u884C\u65F6\u95F4"
        }),
        c: common_assets._imports_1,
        d: common_vendor.p({
          placeholder: "\u8BF7\u586B\u5199\u5730\u7406\u4F4D\u7F6E"
        }),
        e: common_assets._imports_3,
        f: common_vendor.p({
          placeholder: "\u8BF7\u9009\u62E9\u6D3B\u52A8\u7C7B\u578B"
        }),
        g: common_assets._imports_2,
        h: common_vendor.p({
          placeholder: "\u8BF7\u586B\u5199\u62A5\u540D\u4EBA\u6570"
        }),
        i: common_assets._imports_4,
        j: common_vendor.p({
          placeholder: "\u81EA\u5B9A\u4E49\u672C\u6B21\u6D3B\u52A8\u573A\u5730\u6536\u8D39"
        }),
        k: common_assets._imports_3,
        l: common_vendor.p({
          placeholder: "\u8BF7\u586B\u5199\u62A5\u540D\u4EBA\u6570",
          ["disabled:true"]: true
        }),
        m: common_vendor.p({
          text: "+"
        }),
        n: common_vendor.p({
          text: "\u65B0\u6807\u7B7E"
        }),
        o: common_assets._imports_5,
        p: common_vendor.p({
          type: "textarea",
          placeholder: "\u8BF7\u8F93\u5165\u672C\u6B21\u6D3B\u52A8\u7684\u76F8\u5173\u516C\u544A",
          autoHeight: true
        }),
        q: common_assets._imports_6,
        r: common_assets._imports_7
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-65892d9b"], ["__file", "C:/Users/upc/Desktop/ViteStuding/demo/src/pages/createAction/createAction.vue"]]);
wx.createPage(MiniProgramPage);
