<template>    
    <table :class="classes" :style="styles" cellspacing="0" cellpadding="0" @click="onEndEdit" @keyup.ctrl.90="onUndo">
      <thead v-if="colsType != 0">
      <tr>
      <th scope="col" v-for="(col, cindex) in columnsConfig" :key="cindex" v-if="showColumn(cindex)" @click="onSort(cindex)" :class="getColClasses(cindex)">
          {{getColName(cindex)}}
      </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(line, lindex) in data" :key="lindex" :class="getRowClasses(lindex)">
          <td v-if="colsType == 2 || colsType == 1" v-for="(col, cindex) in columnsConfig" :key="cindex" @dblclick="onEditEnable({row:lindex, col:cindex})" :class="getCellClasses(lindex, cindex)">
              <span v-if="ifEditStart && allowEdit(lindex, cindex)" @event-input-end-edit="onEndEdit"><input-element v-model="data[lindex][cindex]" :column-key="cindex"></input-element></span>
              <span v-else>
                  <view-element :column-key="cindex" :value="data[lindex][cindex]"></view-element>
              </span>              
          </td>          
          
          <td v-if="colsType == 0" v-for="(col, cindex) in line" :key="cindex" @dblclick="onEditEnable({row:lindex, col:cindex})" :class="getCellClasses(lindex, cindex)">
              <span v-if="ifEditStart && allowEdit(lindex, cindex)"><input-element v-model="data[lindex][cindex]" :column-key="cindex"></input-element></span>
              <span v-else>
                  <view-element :column-key="cindex" :value="data[lindex][cindex]"></view-element>
              </span>
          </td>
          
      </tr>
      </tbody>
    </table>
</template>

<script>
/*if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}*/
const mixHtml = require("./html.mix.js");
const undo = require("./undo.js");
const input = require("./input.vue");
const view = require("./view.vue");
export default {
  name: "Table",
  mixins: [mixHtml.default],
  inject: [],

  props: {
    data: {
      type: Array,
      default: []
    },
    columns: {
      type: [Array, Object],
      default: false
    },
    useUndo: {
      type: Boolean,
      default: true
    },
    defEnableEdit: {
      type: Boolean,
      default: true
    },
    defEnableSort: {
      type: Boolean,
      default: true
    }
  },
  components: {
    "input-element": input.default,
    "view-element": view.default
  },
  data() {
    return {
      ifEditStart: false,
      editCell: {},
      events: {},
      undo: undo.default,
      sort: []
    };
  },
  methods: {
    /**
     * Called when an attempt is made to start editing a cell.
     */
    onEditEnable(event) {
      this.editCell = {
        row: event.row,
        col: event.col,
        initial: this.data[event.row][event.col]
      };
      if (this.useUndo) {
        this.undo.push(this, this.editCell);
      }
      this.ifEditStart = true;
    },
    /**
     * Called when cell editing is complete.
     */
    onEndEdit() {
      if (this.ifEditStart) {
        if (
          this.data[this.editCell.row][this.editCell.col] !=
          this.editCell.initial
        ) {
          var e = {
            row: this.editCell.row,
            col: this.editCell.col,
            initial: this.editCell.initial,
            result: this.data[this.editCell.row][this.editCell.col],
            data: this.data[this.editCell.row]
          };
          this.$emit("event-end-edit-cell", e);
          this.startEvent("event-end-edit-cell", e);
        }
        this.ifEditStart = false;
      }
    },
    onClickInput() {
      return false;
    },
    onSort(col) {
      if (!this.allowSort(col)) {
        return;
      }
      var idx = this.sort.findIndex(function(e, i, ar) {
        return e.col == col;
      });
      if (idx != -1) {
        if (this.sort[idx].direct == "asc") {
          this.sort[idx].direct = "desc";
        } else if (this.sort[idx].direct == "desc") {
          this.sort.splice(idx, 1);
        }
      } else {
        this.sort.push({
          col: col,
          direct: "asc"
        });
      }
      // sort table
      if (this.sort.length > 0) {
        var tbl = this;
        //var
        this.data.sort(function(a, b) {
          for (let i in tbl.sort) {
            let sort_param = tbl.sort[i];
            if (a[sort_param.col] != b[sort_param.col]) {
              let k = sort_param.direct == "asc" ? 1 : -1;
              if (a[sort_param.col] < b[sort_param.col]) {
                return k * -1;
              }
              return k * 1;
            }
          }
          return 0;
        });
        this.$emit("event-sort-table", this.sort);
        this.startEvent("event-sort-table", this.sort);
      }
    },
    /**
     * Set cell state. Needed to cancel editing actions.
     * @param {object} state
     */
    restoreState(state) {
      this.data[state.row][state.col] = state.initial;
    },
    /**
     * Check enable edit column
     * @param {integer|string} col
     * @return {boolean}
     */
    columnEditable(col) {
      if (this.columnsConfig) {
        if (typeof this.columnsConfig[col].enableEdit != "undefined") {
          if (typeof this.columnsConfig[col].enableEdit == "function") {
            return this.columnsConfig.enableEdit[col](col);
          }
          return !!this.columns[col].enableEdit;
        }
      }
      return this.defEnableEdit;
    },
    /**
     * Cell is allowed to edit
     * @param {integer} row
     * @param {integer|string} col
     */
    allowEdit(row, col) {
      /*if (
        this.ifEditStart &&
        this.editCell &&
        this.editCell.row == row &&
        this.editCell.col == col
      ) {
        if (this.colsType == 2) {
          if (typeof this.columns[col].enableEdit == "boolean") {
            return this.columns[col].enableEdit;
          }
        }
        return this.defEnableEdit;
      }
      return false;*/
      return (
        this.ifEditStart &&
        this.editCell &&
        this.editCell.row == row &&
        this.editCell.col == col &&
        this.columnEditable(col)
      );
    },
    /**
     *
     */
    allowSort(col) {
      if (this.colsType == 2) {
        if (typeof this.columns[col].enableSort == "boolean") {
          return this.columns[col].enableSort;
        }
      }
      return this.defEnableSort;
    },
    /**
     * Show or not column in screen
     * @param {integer|string} cindex - column index in order
     *
     */
    showColumn(cindex) {
      if (typeof this.columns == "object") {
        if (typeof this.columns["show"] == "boolean") {
          return this.columns["show"];
        }
        return true;
      }
      return false;
    },
    /**
     * Return column name for output from index
     * @param {integer} index - column index in order
     * @return {string}
     */
    getColName(index) {
      if (this.columns) {
        let colData = this.columns[index];
        if (typeof colData == "object") {
          if (typeof colData.name == "string" && colData.name) {
            return colData.name;
          }
          return index;
        }
        return colData;
      }
      return index;
    },
    getColClasses(col) {
      var classes = "";
      var idx = this.sort.findIndex(function(e, i, ar) {
        return e.col == col;
      });
      if (idx != -1) {
        classes += "sort sort-" + this.sort[idx].direct;
      }
      return classes;
    },
    getRowClasses(row) {
      return "";
    },
    getCellClasses(row, col) {
      let cls = "editable";
      if (!this.columnEditable(col)) {
        cls = "read-only";
      }
      return cls;
    },
    /**
     * Load new table content
     * @param {array} table - new table
     * @return {boolean} true - if ok and false - if error
     */
    load(table) {
      if (Array.isArray(table)) {
        this.data = table;
        return true;
      }
      return false;
    },
    registerEventListener(eventName, f) {
      if (typeof this.events[eventName] != "object") {
        this.events[eventName] = [];
      }
      this.events[eventName][this._events[eventName].length] = f;
    },
    startEvent(eventName, params = {}) {
      if (typeof this.events[eventName] == "object") {
        let funcs = this.events[eventName];
        for (var idx in funcs) {
          if (typeof funcs[idx] == "function") {
            funcs[idx](params);
          }
        }
      }
    }
  },
  computed: {
    /**
     * Return type column config
     */
    colsType() {
      if (!this.columns) {
        return 0;
      }
      if (typeof this.columns == "object") {
        if (Array.isArray(this.columns)) {
          return 1;
        }
        return 2;
      }
    },
    columnsConfig() {
      if (Array.isArray(this.columns)) {
        var res = {};
        for (var key in this.columns) {
          res[key] = {
            name: this.columns[key]
          };
        }
        return res;
      }
      if (typeof this.columns == "object") {
        return this.columns;
      }
      return false;
    }
  },
  mounted() {
    var tbl = this;
    window.addEventListener("click", function(e) {
      tbl.onEndEdit();
    });
  },
  provide() {
    var tbl = this;
    return {
      registerEventListener: this.registerEventListener,
      load: this.load,
      getColumnConfig: function(col) {
        if (tbl.columnsConfig) {
          return tbl.columnsConfig[col];  
        }
        return {};
      }
    };
  }
};
</script>
 
<style>
</style>