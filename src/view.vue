<template>    
    <span :class="classes" :style="styles">
        <template v-if="viewType == 'image'">
            <img :src="view" style="max-width:100%;">
        </template>
        <template v-else>
            {{view}}
        </template>       
    </span>
</template>

<script>
const mixHtml = require("./html.mix.js");
export default {
  name: "view-render",
  mixins: [mixHtml.default],
  inject: ["getColumnConfig"],

  props: ["value", "columnKey"],
  data() {
    return {};
  },
  methods: {},
  computed: {
    viewType() {
        var t = "text";
        if (typeof this.config.type != "undefined") {
            if (this.config.type == "image") {
                return this.config.type;
            }
        }
        return t;
    },
    config() {
        return this.getColumnConfig(this.columnKey);        
    },
    options() {
      let col_data = this.config;
      if (typeof col_data.options == "object") {
        var res = {};
        let thisArray = Array.isArray(col_data.options);
        for (let e in col_data.options) {
          let v = col_data.options[e];
          if (typeof v == "function") {
            let resValue = v();
            if (thisArray) {
              res[resValue] = resValue;
            } else {
              res[e] = resValue;
            }
          } else {
            if (thisArray) {
              res[v] = v;
            } else {
              res[e] = v;
            }
          }
        }
        return res;
      }
      return {};
    }, // end options
    view() {
      let options = this.options;
      if (Object.keys(options).length > 0) {
        if (typeof options[this.value] != "undefined") {
          return options[this.value];
        }        
      }
      return this.value;
    } // end view
  }
  //mounted() {},
  //provide() {}
};
</script>
 
<style>
</style>