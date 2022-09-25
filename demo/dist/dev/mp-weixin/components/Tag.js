"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Tag",
  props: {
    title: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const { title } = common_vendor.toRefs(props);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(title))
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bb7ceecc"], ["__file", "C:/Users/upc/Desktop/ViteStuding/demo/src/components/Tag.vue"]]);
wx.createComponent(Component);
