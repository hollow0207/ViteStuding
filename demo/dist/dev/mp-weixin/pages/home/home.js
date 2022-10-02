"use strict";
var common_vendor = require("../../common/vendor.js");
var common_assets = require("../../common/assets.js");
var api_home_api = require("../../api/home_api.js");
require("../../utils/request.js");
require("../../utils/config.js");
if (!Math) {
  (Search + Tag + Event + Selection)();
}
const Search = () => "../../components/Search.js";
const Tag = () => "../../components/Tag.js";
const Selection = () => "../../components/Selection.js";
const Event = () => "../../components/Event.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    let userEventList = common_vendor.ref({});
    let allEventList = common_vendor.ref({});
    common_vendor.onLoad(() => {
      api_home_api.getUserEventList().then((res) => {
        userEventList.value = res.data.data;
      });
      api_home_api.getAllEventList().then((res) => {
        allEventList.value = res.data.data;
      });
      console.log(userEventList);
      console.log(allEventList);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "\u6211\u7684\u6D3B\u52A8"
        }),
        b: common_vendor.f(common_vendor.unref(userEventList), (item, i, i0) => {
          return {
            a: "087d42bb-2-" + i0,
            b: common_vendor.p({
              time: item.time,
              title: item.title,
              limit: item.limit
            }),
            c: i
          };
        }),
        c: common_assets._imports_0,
        d: common_vendor.f(common_vendor.unref(allEventList), (item, i, i0) => {
          return {
            a: "087d42bb-4-" + i0,
            b: common_vendor.p({
              isAllEvent: true,
              title: item.title,
              time: item.time,
              limit: item.limit
            }),
            c: i
          };
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-087d42bb"], ["__file", "C:/Users/upc/Desktop/ViteStuding/demo/src/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
