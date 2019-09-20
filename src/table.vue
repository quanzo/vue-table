<template>    
    <div>
    <slot name="before"></slot>
    <table :class="classes" :style="styles" cellspacing="0" cellpadding="0" @click="onEndEdit">
      <thead v-if="colsType != 0">
      <tr>
      <th v-if="enableChecked"><input type="checkbox" name="all_check" v-model="checkedAll"></th>
      <th scope="col" v-for="(col, cindex) in columnsConfig" :key="cindex" v-if="showColumn(cindex)" @click="onSort(cindex)" :class="getColClasses(cindex)">
          {{getColName(cindex)}}
      </th>
      </tr>
      </thead>
      
      <tbody>
      <tr v-for="(line, lindex) in data" :key="lindex" :class="getRowClasses(lindex)" :data-blocked="blockRow(lindex)" @click.ctrl="onInsertRow(lindex, $event)">
          
          <td v-if="enableChecked"><input type="checkbox" :name="'row'+lindex" v-model="tblCheckedRows[lindex]"></td>
          
          <td v-if="colsType == 2 || colsType == 1" v-for="(col, cindex) in columnsConfig" :key="cindex" @dblclick="onEditEnable({row:lindex, col:cindex})" :class="getCellClasses(lindex, cindex)">
              <span v-if="ifEditStart && allowEdit(lindex, cindex)"><input-element v-model="data[lindex][cindex]" :column-key="cindex" @event-input-end-edit="onEndEdit"></input-element></span>
              <span v-else>
                  <view-element :column-key="cindex" :value="data[lindex][cindex]"></view-element>
              </span>
          </td>
          
          <td v-if="colsType == 0" v-for="(col, cindex) in line" :key="cindex" @dblclick="onEditEnable({row:lindex, col:cindex})" :class="getCellClasses(lindex, cindex)">
              <span v-if="ifEditStart && allowEdit(lindex, cindex)"><input-element v-model="data[lindex][cindex]" :column-key="cindex" @event-input-end-edit="onEndEdit"></input-element></span>
              <span v-else>
                  <view-element :column-key="cindex" :value="data[lindex][cindex]"></view-element>
              </span>
          </td>
          
      </tr>
      </tbody>
    </table>
    <button @click="onInsertRow($event)">+</button>
    <slot></slot>
    </div>
</template>

<script>
/*if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}*/
const mixHtml = require("./html.mix.js");
const undo = require("./undo.js");
const input = require("./input-element.vue");
const view = require("./view-element.vue");
export default {
  name: "Table",
  mixins: [mixHtml.default],
  inject: [],

  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      }
    },
    columns: {
      type: [Array, Object, Boolean],
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
    },
    enableChecked: {
      type: Boolean,
      default: true
    },
    enableInserRow: {
      type: Boolean,
      default: true
    },
    sort: {
      type: Array,
      default: function () {
        return [];
      }
    },
    checkedRows: {
      type: Array,
      default: function () {
        return [];
      }
    },
    blockedRows: {
      type: Array,
      default: function () {
        return [];
      }
    },
    cellClasses: {
      type: Array,
      default: function () {
        return [];
      }
    },
    rowClasses: {
      type: Array,
      default: function () {
        return [];
      }
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
      tblSort: this.sort,
      tblCellClasses: this.cellClasses,
      tblRowClasses: this.rowClasses,
      tblCheckedRows: this.checkedRows,
      tblBlockedRows: this.blockedRows
    };
  },
  methods: {
    /**
     * Called when an attempt is made to start editing a cell.
     */
    onEditEnable(event) {
      this.editCell = {
        operation: "edit",
        row: event.row,
        col: event.col,
        initial: this.data[event.row][event.col],
        data: this.data[event.row]
      };
      
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
          if (this.useUndo) {
            this.undo.push(this, this.editCell);
          }
          var e = {
            row: this.editCell.row,
            col: this.editCell.col,
            initial: this.editCell.initial,
            result: this.data[this.editCell.row][this.editCell.col],
            data: this.data[this.editCell.row]
          };
          console.log("event-end-edit-cell", e);
          this.$emit("event-end-edit-cell", e);
          this.startEvent("event-end-edit-cell", e);
        }
        this.ifEditStart = false;
      }
    },
    onClickInput() {
      return false;
    },
    /**
     * Compare two line in table (for sort).
     * @param {array|object} a - line one
     * @param {array|object} b - line two
     * @param {array} sortParam - column sort order and direction for each. array of object
     */
    _compareTwoLine(a, b, sortParam) {
      for (let i in sortParam) {
        let sort_param = sortParam[i];
        if (a[sort_param.col] != b[sort_param.col]) {
          let k = sort_param.direct == "asc" ? 1 : -1;
          if (a[sort_param.col] < b[sort_param.col]) {
            return k * -1;
          }
          return k * 1;
        }
      }
      return 0;
    },
    onSort(col) {
      if (!this.allowSort(col)) {
        return;
      }
      var idx = this.tblSort.findIndex(function(e, i, ar) {
        return e.col == col;
      });
      if (idx != -1) {
        if (this.tblSort[idx].direct == "asc") {
          this.tblSort[idx].direct = "desc";
        } else if (this.tblSort[idx].direct == "desc") {
          this.tblSort.splice(idx, 1);
        }
      } else {
        this.tblSort.push({
          col: col,
          direct: "asc"
        });
      }
      // sort table
      if (this.tblSort.length > 0) {
        var tbl = this;

        var checkedPresent = false;
        var blockedPresent = false;
        var rowclassesPresent = false;
        var cellclassesPresent = false;
        var rowsCount = this.data.length;
        for (let i = 0; i < rowsCount; i++) {
          if (typeof this.tblCheckedRows[i] != "undefined") {
            checkedPresent |= this.tblCheckedRows[i];
          } else {
            this.tblCheckedRows[i] = false;
          }
          /*****/
          if (typeof this.tblBlockedRows[i] != "undefined") {
            blockedPresent |= this.tblBlockedRows[i];
          } else {
            this.tblBlockedRows[i] = false;
          }
          /*****/
          if (typeof this.tblRowClasses[i] != "undefined") {
            rowclassesPresent |= true;
          } else {
            this.tblRowClasses[i] = "";
          }
          /*****/
          if (typeof this.tblCellClasses[i] != "undefined") {
            cellclassesPresent |= true;
          } else {
            this.tblCellClasses[i] = {};
          }
        }

        if (checkedPresent || blockedPresent) {
          function sortCheckedArray(paramName) {
            // на основе отметок сформируем массив с указателем на строку и статусом отметки
            let toSortChecked = [];
            for (let i = 0; i < rowsCount; i++) {
              toSortChecked[i] = { index: i, value: tbl[paramName][i] };
            }
            // сортируем на основании строк, но по сформированному массиву на основании отметок
            // это спрогнозированное расположение строк для переноса отметок
            toSortChecked.sort(function(a, b) {
              return tbl._compareTwoLine(
                tbl.data[a.index],
                tbl.data[b.index],
                tbl.sort
              );
            });
            // на основании отсортированного массива, поставим новые отметки
            var newCheckedArray = [];
            for (let i = 0; i < rowsCount; i++) {
              newCheckedArray[i] = toSortChecked[i].value;
            }
            // установим новые отметки
            tbl.$set(tbl, paramName, newCheckedArray);
          }; // end func sortCheckedArray
          if (checkedPresent) {
            sortCheckedArray("tblCheckedRows");
          }          
          if (blockedPresent) {            
            sortCheckedArray("tblBlockedRows");            
          }
          if (rowclassesPresent) {
            sortCheckedArray("tblRowClasses");
          }
          if (cellclassesPresent) {
            sortCheckedArray("tblCellClasses");
          }
        }

        this.data.sort(function(a, b) {
          return tbl._compareTwoLine(a, b, tbl.sort);
        });
        console.log("event-sort-table", this.tblSort);
        this.$emit("event-sort-table", this.tblSort);
        this.startEvent("event-sort-table", this.tblSort);
      }
    }, // end onSort

    onInsertRow(row, event) {
      //console.log(row, event);
      if (!this.enableInserRow) {
        //console.log(this.enableInserRow);
        return;
      }
      if (this.colsType == 0 || this.colsType == 1) {
        var newRow = [];
        console.log(this.columnsConfig);
      } else {
        var newRow = {};
      }
      if (this.columnsConfig) {
        for (let i in this.columnsConfig) {
          newRow[i] = this.columnsConfig[i].default;
        }
      } else {
        
        if (this.data.length > 0) {
          if (!Array.isArray(this.data[0])) {
            newRow = {};
          }          
          for (let i in this.data[0]) {
            newRow[i] = "";
          }
        }
      }      
      this.insertRow(row, newRow);
      var e = {
        afterRow: row,
        data: newRow
      }
      console.log("event-new-row", e);
      this.$emit("event-new-row", e);
      this.startEvent("event-new-row", e);
    },

    /**
     * Set cell state. Needed to cancel editing actions. Восстановление состояния. См onEditEnable
     * @param {object} state
     */
    restoreState(state) {
      console.log("Restore state");
      if (state.operation == "edit") {
        var e = {
          row: state.row,
          col: state.col,
          initial: state.data[state.col],
          result: state.initial,
          data: state.data
        };
        //state.data[state.col] = state.initial;
        this.$set(state.data, state.col, state.initial);        
      
        console.log("event-end-edit-cell", e);
        this.$emit("event-end-edit-cell", e);
        this.startEvent("event-end-edit-cell", e);
      }      
    },

    /**
     * Check enable edit column
     * @param {integer|string} col
     * @return {boolean}
     */
    columnEditable(col) {
      if (this.columnsConfig) {
        if (typeof this.columnsConfig[col] == "undefined") {
          return false;
        }
        
        if (typeof this.columnsConfig[col]["enableEdit"] != "undefined") {
          if (typeof this.columnsConfig[col]["enableEdit"] == "function") {
            return this.columnsConfig.enableEdit[col](col);
          }
          return !!this.columnsConfig[col].enableEdit;
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
      return (
        this.ifEditStart &&
        this.editCell &&
        this.editCell.row == row &&
        this.editCell.col == col &&
        this.columnEditable(col) &&
        !this.blockRow(row)
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
     * @return {boolean}
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
      if (this.columnsConfig) {
        if (typeof this.columnsConfig[index] != "undefined") {
          let colData = this.columnsConfig[index];
          if (typeof colData.name == "string" && colData.name) {
            return colData.name;
          }
        }
      }
      return index;
    },
    /**
     * Get column css classes. Calculate it.
     * @param {mixed} col
     * @return {string}
     */
    getColClasses(col) {
      var classes = "";
      var idx = this.tblSort.findIndex(function(e, i, ar) {
        return e.col == col;
      });
      if (idx != -1) {
        classes += "sort sort-" + this.tblSort[idx].direct;
      }
      return classes;
    },

    getRowClasses(row) {
      let cls = [];
      if (this.blockRow(row)) {
        cls[cls.length] = "blocked";
      }
      if (typeof this.tblRowClasses[row] != "undefined") {
        if (!Array.isArray(this.tblRowClasses[row])) {
          var arGivenClasses = this.tblRowClasses[row].trim().split(" ");
        } else {
          var arGivenClasses = this.tblRowClasses[row];
        }
        if (arGivenClasses.length > 0) {
          var arAddToCls = arGivenClasses.filter(v => {
            return cls.indexOf(v) == -1;
          });
          if (arAddToCls.length > 0) {
            cls.push(...arAddToCls);
          }
        }
      }
      return cls.join(" ");
    },

    setRowClasses(row, classes) {
      //this.tblRowClasses[row] = classes;
      this.$set(this.tblRowClasses, row, classes);
    },

    /**
     * Get cell css classes. Calculate it.
     * @param {integer} row
     * @param {mixed} col
     * @return {string}
     */
    getCellClasses(row, col) {
      let cls = ["editable"];
      if (!this.columnEditable(col)) {
        cls[0] = "read-only";
      }
      if (
        typeof this.tblCellClasses[row] != "undefined" &&
        typeof this.tblCellClasses[row][col] != "undefined"
      ) {
        let stored = this.tblCellClasses[row][col];
        if (!Array.isArray(stored)) {
          var arGivenClasses = stored.trim().split(" ");
        } else {
          var arGivenClasses = stored;
        }
        if (arGivenClasses.length > 0) {
          var arAddToCls = arGivenClasses.filter(v => {
            return cls.indexOf(v) == -1;
          });
          if (arAddToCls.length > 0) {
            cls.push(...arAddToCls);
          }
        }
      }
      return cls.join(" ");
    },

    setCellClasses(row, col, classes) {
      if (typeof this.tblCellClasses[row] == "undefined") {
        this.tblCellClasses[row] = {};
      }
      this.tblCellClasses[row][col] = classes;      
      //this.$set(this.tblCellClasses[row], col, classes);
    },

    /**
     * Check present row in table
     * @param {integer} row
     * @param {mixed} col
     * @return {boolean}
     */
    isRow(row) {
      return typeof this.data[row] != "undefined";
    },

    /**
     * Check present cell in table
     * @param {integer} row
     * @param {mixed} col
     * @return {boolean}
     */
    isCell(row, col) {
      if (this.isRow(row)) {
        return typeof this.data[row][col] != "undefined";
      }
      return false;
    },

    /**
     * Rows count
     * @return {integer}
     */
    rows() {
      if (Array.isArray(this.data)) {
        return this.data.length;
      }
      return 0;
    },

    /**
     * Get cell data
     * @param {integer} row
     * @param {mixed} col
     * @return {mixed}
     */
    cell(row, col) {
      if (this.isCell(row, col)) {
        return this.data[row][col];
      }
      return null;
    },

    /**
     * Get row data
     * @param {integer} row
     * @return {mixed}
     */
    row(row) {
      if (this.isRow(row)) {
        return this.data[row];
      }
      return null;
    },

    /**
     * Set cell data
     * @param {integer} row
     * @param {mixed} col
     * @param {mixed} value
     * @return {boolean}
     */
    setCell(row, col, value) {
      if (this.isCell(row, col)) {
        this.$set(this.data[row], col, value);
        //this.data[row][col] = value;
        return true;
      }
      return false;
    },

    /**
     * Set row
     * @param {integer} row
     * @param {mixed} value
     * @return {boolean}
     */
    setRow(row, value) {
      if (this.isRow(row)) {
        this.$set(this.data, row, value);
        //this.data[row] = value;
        return true;
      }
      return false;
    },

    insertRow(afterRow, ...value) {
      if (this.isRow(afterRow)) {
        this.data.splice(afterRow + 1, 0, ...value);
      }
    },

    deleteRow(row, count = 1) {
      if (this.isRow(row)) {
        this.data.splice(row, count);
      }
    },

    checkRow(row, status = null) {
      if (status !== null) {
        var s = !!status;
        this.tblCheckedRows[row] = s;
        return s;
      }
      if (typeof this.tblCheckedRows[row] == "undefined") {
        this.tblCheckedRows[row] = false;
      }
      return this.tblCheckedRows[row];
    },

    blockRow(row, status = null) {
      if (status !== null) {
        var s = !!status;
        this.$set(this.tblBlockedRows, row, s);
        //this.tblBlockedRows[row] = s;
        if (s && this.ifEditStart && this.editCell.row == row) {
          this.data[this.editCell.row][
            this.editCell.col
          ] = this.editCell.initial;
          this.onEndEdit();
        }
        return s;
      }
      if (typeof this.tblBlockedRows[row] == "undefined") {
        this.tblBlockedRows[row] = false;
      }
      return !!this.tblBlockedRows[row];
    },

    /**
     * Load new table content
     * @param {array} table - new table
     * @return {boolean} - true if ok, and false if error
     */
    load(table) {
      if (Array.isArray(table)) {
        this.undo.clean(this);
        this.$set(this, data, table);        
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
    /**
     * Standardized table column configuration
     */
    columnsConfig() {
      console.log("Columns config calculate");      
      if (typeof this.columns == "object") {
        var res = {};
        if (Array.isArray(this.columns)) {          
          for (let key in this.columns) {
            res[key] = {
              name: this.columns[key],
              type: "string",
              default: ""
            };
          }
        } else {
          res = this.columns;
        }
        for (let key in res) {
          if (typeof res[key]["type"] == "undefined") {
            res[key]["type"] = "string";
          }
          if (typeof res[key]["default"] == "undefined") {
            switch(res[key]["type"]) {
              case "number":
                res[key]["default"] = 0;
                break;
              default:
                res[key]["default"] = "";
                break;
            } // end switch
          }
        }        
        return res;
      }
      return false;
    },
    checkedAll: {
      get: function() {
        let rowsCount = this.data.length;
        if (rowsCount == 0) {
          return false;
        }
        for (var i = 0; i < rowsCount; i++) {
          if (
            typeof this.tblCheckedRows[i] == "undefined" ||
            !this.tblCheckedRows[i]
          ) {
            return false;
          }
        }
        return true;
      },
      set: function(status) {
        let rowsCount = this.data.length;
        for (var i = 0; i < rowsCount; i++) {
          this.$set(this.tblCheckedRows, i, !!status);
        }
      }
    }
  },
  watch: {
    tblCheckedRows: function(val) {
      var e = {
        current: []
      };
      let rowsCount = this.data.length;
      for (var i = 0; i < rowsCount; i++) {
        if (typeof val[i] != "undefined") {
          e.current[i] = val[i];
        } else {
          e.current[i] = false;
        }
      }
      console.log("event-checked", e);
      this.$emit("event-checked", e);
      this.startEvent("event-checked", e);
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
      },
      isRow: this.isRow,
      isCell: this.isCell,
      cell: this.cell,
      setCell: this.setCell,
      rows: this.rows,
      row: this.row,
      setRow: this.setRow,
      insertRow: this.insertRow,
      deleteRow: this.deleteRow,
      getCellClasses: this.getCellClasses,
      getRowClasses: this.getRowClasses,
      setCellClasses: this.setCellClasses,
      setRowClasses: this.setRowClasses,
      getChecked: function() {
        var checkedCount = this.data.length;
        var res = [];
        for (let i = 0; i < checkedCount; i++) {
          if (typeof this.tblCheckedRows[i] != "undefined") {
            res[i] = this.tblCheckedRows[i];
          } else {
            res[i] = false;
          }
        }
        return res;
      },
      checkRow: this.checkRow,
      blockRow: this.blockRow
    };
  }
};
</script>
 
<style>
</style>