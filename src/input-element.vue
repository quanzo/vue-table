<template>    
    <span>
        <input v-if="inputType == 'string' || inputType == 'image'" type="text" :class="classes" :style="styles" :value="value" @input="$emit('input', $event.target.value)" @click.stop="onClickInput" @keyup.enter="onEndEdit">
        <input v-if="inputType == 'number'" type="number" :class="classes" :style="styles" :value="value" @input="$emit('input', $event.target.value)" @click.stop="onClickInput" @keyup.enter="onEndEdit">
        <select v-if="inputType == 'select'" :class="classes" :style="styles" :value="value" @input="$emit('input', $event.target.value)" @click.stop="onClickInput">
            <option v-for="(text, key) in options" :key="key" :value="key">{{text}}</option>
        </select>
    </span>
</template>

<script>
const mixHtml = require("./html.mix.js");
export default {
  name: "input-render",
  mixins: [mixHtml.default],
  inject: ["getColumnConfig"],

  props: ["value", "columnKey"],
  data() {
    return {};
  },
  methods: {
    onEndEdit() {
      this.$emit("event-input-end-edit");
    },
    onClickInput() {
      return false;
    }
  },
  computed: {
    inputType() {
      var i_type = "string";
      let col_data = this.getColumnConfig(this.columnKey);
      if (typeof col_data == "object") {
        if (typeof col_data["type"] != "undefined") {
          i_type = col_data["type"];
        }
      }
      return i_type;
    }, // end inputType
    options() {
      if (this.inputType == "select") {
        let col_data = this.getColumnConfig(this.columnKey);
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
      }
      return {};
    } // end options
  }
};
</script>
 
<style>
</style>