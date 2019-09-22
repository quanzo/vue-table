!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueTable=e():t.VueTable=e()}(window,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=4)}([function(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(e){return"function"==typeof Symbol&&"symbol"===n(Symbol.iterator)?t.exports=i=function(t){return n(t)}:t.exports=i=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":n(t)},i(e)}t.exports=i},function(t,e,n){"use strict";function i(t,e,n,i,o,s,l,r){var a,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),i&&(c.functional=!0),s&&(c._scopeId="data-v-"+s),l?(a=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(l)},c._ssrRegister=a):o&&(a=r?function(){o.call(this,this.$root.$options.shadowRoot)}:o),a)if(c.functional){c._injectStyles=a;var u=c.render;c.render=function(t,e){return a.call(e),u(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,a):[a]}return{exports:t,options:c}}n.d(e,"a",function(){return i})},function(t,e,n){"use strict";n.r(e),e.default={props:{styles:{type:String,default:""},classes:{type:String,default:""}}}},function(t,e,n){var i=n(5),o=n(6),s=n(7);t.exports=function(t){return i(t)||o(t)||s()}},function(t,e,n){t.exports={Table:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Table",e=n(10);return Object.assign(e.default,{name:t})},TestSlave:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"slave-test",e=n(9);return Object.assign(e.default,{name:t})}}},function(t,e){t.exports=function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}},function(t,e){t.exports=function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},function(t,e,n){"use strict";n.r(e),void 0===window.VueGlobalUndo&&(window.VueGlobalUndo={undo:[],components:[],push:function(t,e){this.components.push(t);this.undo.push(e)},restore:function(){if(console.log("Ctrl+z"),this.undo.length>0){var t=this.components.pop(),e=this.undo.pop();"function"==typeof t.restoreState&&t.restoreState(e)}},clean:function(t){for(var e=0,n=this.components.length;n>=0;n--)this.components[n]===t&&(this.components.splice(n,1),e++);return e}},window.addEventListener("keyup",function(t){t.ctrlKey&&"KeyZ"==t.code&&!t.shiftKey&&VueGlobalUndo.restore()})),e.default=window.VueGlobalUndo},function(t,e,n){"use strict";n.r(e),e.default={name:"slave-test",inject:["isRow","isCell","cell","setCell","rows","row","setRow","setCellClasses","setRowClasses","getCellClasses","getRowClasses"],data:function(){return{}},methods:{tick:function(){var t=["id","name","family","country","town","img"],e=this.rnd(0,this.rowcounts-1),n=this.rnd(0,this.rowcounts-1),i=this.rnd(0,5),o=this.rnd(0,5),s="class"+this.rnd(1,5),l="class"+this.rnd(1,5),r=this.row(e),a=this.row(n);this.setRow(e,a),this.setRow(n,r),this.setCellClasses(e,t[i],s),this.setCellClasses(n,t[o],l)},rnd:function(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t}},computed:{rowcounts:function(){return this.rows()}},render:function(){},mounted:function(){setInterval(this.tick,1e3)}}},function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._t("before"),t._v(" "),n("table",{class:t.classes,style:t.styles,attrs:{cellspacing:"0",cellpadding:"0"},on:{click:t.onEndEdit}},[0!=t.colsType?n("thead",[n("tr",[t.enableChecked?n("th",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.checkedAll,expression:"checkedAll"}],attrs:{type:"checkbox",name:"all_check"},domProps:{checked:Array.isArray(t.checkedAll)?t._i(t.checkedAll,null)>-1:t.checkedAll},on:{change:function(e){var n=t.checkedAll,i=e.target,o=!!i.checked;if(Array.isArray(n)){var s=t._i(n,null);i.checked?s<0&&(t.checkedAll=n.concat([null])):s>-1&&(t.checkedAll=n.slice(0,s).concat(n.slice(s+1)))}else t.checkedAll=o}}})]):t._e(),t._v(" "),t._l(t.columnsConfig,function(e,i){return t.showColumn(i)?n("th",{key:i,class:t.getColClasses(i),attrs:{scope:"col"},on:{click:function(e){return t.onSort(i)}}},[t._v("\n      "+t._s(t.getColName(i))+"\n  ")]):t._e()})],2)]):t._e(),t._v(" "),n("tbody",t._l(t.data,function(e,i){return n("tr",{key:i,class:t.getRowClasses(i),attrs:{"data-blocked":t.blockRow(i)},on:{click:function(e){return e.ctrlKey?t.onInsertRow(i,e):null}}},[t.enableChecked?n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.tblCheckedRows[i],expression:"tblCheckedRows[lindex]"}],attrs:{type:"checkbox",name:"row"+i},domProps:{checked:Array.isArray(t.tblCheckedRows[i])?t._i(t.tblCheckedRows[i],null)>-1:t.tblCheckedRows[i]},on:{change:function(e){var n=t.tblCheckedRows[i],o=e.target,s=!!o.checked;if(Array.isArray(n)){var l=t._i(n,null);o.checked?l<0&&t.$set(t.tblCheckedRows,i,n.concat([null])):l>-1&&t.$set(t.tblCheckedRows,i,n.slice(0,l).concat(n.slice(l+1)))}else t.$set(t.tblCheckedRows,i,s)}}})]):t._e(),t._v(" "),t._l(t.columnsConfig,function(e,o){return 2==t.colsType||1==t.colsType?n("td",{key:o,class:t.getCellClasses(i,o),on:{dblclick:function(e){return t.onEditEnable({row:i,col:o})}}},[t.ifEditStart&&t.allowEdit(i,o)?n("span",[n("input-element",{attrs:{"column-key":o},on:{"event-input-end-edit":t.onEndEdit},model:{value:t.data[i][o],callback:function(e){t.$set(t.data[i],o,e)},expression:"data[lindex][cindex]"}})],1):n("span",[n("view-element",{attrs:{"column-key":o,value:t.data[i][o]}})],1)]):t._e()}),t._v(" "),t._l(e,function(e,o){return 0==t.colsType?n("td",{key:o,class:t.getCellClasses(i,o),on:{dblclick:function(e){return t.onEditEnable({row:i,col:o})}}},[t.ifEditStart&&t.allowEdit(i,o)?n("span",[n("input-element",{attrs:{"column-key":o},on:{"event-input-end-edit":t.onEndEdit},model:{value:t.data[i][o],callback:function(e){t.$set(t.data[i],o,e)},expression:"data[lindex][cindex]"}})],1):n("span",[n("view-element",{attrs:{"column-key":o,value:t.data[i][o]}})],1)]):t._e()})],2)}),0)]),t._v(" "),n("button",{on:{click:function(e){return t.onInsertRow(e)}}},[t._v("+")]),t._v(" "),t._t("default")],2)};i._withStripped=!0;var o=n(3),s=n.n(o),l=n(0),r=n.n(l),a=n(2),c=n(8),u=n(11),d=n(12),h={name:"Table",mixins:[a.default],inject:[],props:{data:{type:Array,default:function(){return[]}},columns:{type:[Array,Object,Boolean],default:!1},useUndo:{type:Boolean,default:!0},defEnableEdit:{type:Boolean,default:!0},enableEdit:{type:Boolean,default:!0},defEnableSort:{type:Boolean,default:!0},enableSort:{type:Boolean,default:!0},enableChecked:{type:Boolean,default:!0},enableInserRow:{type:Boolean,default:!0},sort:{type:Array,default:function(){return[]}},checkedRows:{type:Array,default:function(){return[]}},blockedRows:{type:Array,default:function(){return[]}},cellClasses:{type:Array,default:function(){return[]}},rowClasses:{type:Array,default:function(){return[]}}},components:{"input-element":u.default,"view-element":d.default},data:function(){return{ifEditStart:!1,editCell:{},events:{},undo:c.default,tblSort:this.sort,tblCellClasses:this.cellClasses,tblRowClasses:this.rowClasses,tblCheckedRows:this.checkedRows,tblBlockedRows:this.blockedRows}},methods:{onEditEnable:function(t){this.editCell={operation:"edit",row:t.row,col:t.col,initial:this.data[t.row][t.col],data:this.data[t.row]},this.ifEditStart=!0},onEndEdit:function(){if(this.ifEditStart){if(this.data[this.editCell.row][this.editCell.col]!=this.editCell.initial){this.useUndo&&this.undo.push(this,this.editCell);var t={row:this.editCell.row,col:this.editCell.col,initial:this.editCell.initial,result:this.data[this.editCell.row][this.editCell.col],data:this.data[this.editCell.row]};console.log("event-end-edit-cell",t),this.$emit("event-end-edit-cell",t),this.startEvent("event-end-edit-cell",t)}this.ifEditStart=!1}},onClickInput:function(){return!1},_compareTwoLine:function(t,e,n){for(var i in n){var o=n[i];if(t[o.col]!=e[o.col]){var s="asc"==o.direct?1:-1;return t[o.col]<e[o.col]?-1*s:1*s}}return 0},onSort:function(t){if(this.onEndEdit(),this.allowSort(t)){var e=this.tblSort.findIndex(function(e,n,i){return e.col==t});if(-1!=e?"asc"==this.tblSort[e].direct?this.tblSort[e].direct="desc":"desc"==this.tblSort[e].direct&&this.tblSort.splice(e,1):this.tblSort.push({col:t,direct:"asc"}),this.tblSort.length>0){for(var n=this,i=!1,o=!1,s=!1,l=!1,r=this.data.length,a=0;a<r;a++)void 0!==this.tblCheckedRows[a]?i|=this.tblCheckedRows[a]:this.tblCheckedRows[a]=!1,void 0!==this.tblBlockedRows[a]?o|=this.tblBlockedRows[a]:this.tblBlockedRows[a]=!1,void 0!==this.tblRowClasses[a]?s|=!0:this.tblRowClasses[a]="",void 0!==this.tblCellClasses[a]?l|=!0:this.tblCellClasses[a]={};if(i||o){var c=function(t){for(var e=[],i=0;i<r;i++)e[i]={index:i,value:n[t][i]};e.sort(function(t,e){return n._compareTwoLine(n.data[t.index],n.data[e.index],n.sort)});for(var o=[],s=0;s<r;s++)o[s]=e[s].value;n.$set(n,t,o)};i&&c("tblCheckedRows"),o&&c("tblBlockedRows"),s&&c("tblRowClasses"),l&&c("tblCellClasses")}this.data.sort(function(t,e){return n._compareTwoLine(t,e,n.sort)}),console.log("event-sort-table",this.tblSort),this.$emit("event-sort-table",this.tblSort),this.startEvent("event-sort-table",this.tblSort)}}},onInsertRow:function(t,e){if(this.onEndEdit(),this.enableInserRow){if(0==this.colsType||1==this.colsType){var n=[];console.log(this.columnsConfig)}else n={};if(this.columnsConfig)for(var i in this.columnsConfig)n[i]=this.columnsConfig[i].default;else if(this.data.length>0)for(var o in Array.isArray(this.data[0])||(n={}),this.data[0])n[o]="";this.insertRow(t,n);var s={afterRow:t,data:n};console.log("event-new-row",s),this.$emit("event-new-row",s),this.startEvent("event-new-row",s)}},restoreState:function(t){if(this.onEndEdit(),console.log("Restore state"),"edit"==t.operation){var e={row:t.row,col:t.col,initial:t.data[t.col],result:t.initial,data:t.data};this.$set(t.data,t.col,t.initial),console.log("event-end-edit-cell",e),this.$emit("event-end-edit-cell",e),this.startEvent("event-end-edit-cell",e)}},columnEditable:function(t){if(this.columnsConfig){if(void 0===this.columnsConfig[t])return!1;if(void 0!==this.columnsConfig[t].enableEdit)return"function"==typeof this.columnsConfig[t].enableEdit?this.enableEdit&&this.columnsConfig.enableEdit[t](t):this.enableEdit&&!!this.columnsConfig[t].enableEdit}return this.enableEdit&&this.defEnableEdit},allowEdit:function(t,e){return this.ifEditStart&&this.editCell&&this.editCell.row==t&&this.editCell.col==e&&this.columnEditable(e)&&!this.blockRow(t)},allowSort:function(t){return 2==this.colsType&&"boolean"==typeof this.columns[t].enableSort?this.enableSort&&this.columns[t].enableSort:this.enableSort&&this.defEnableSort},showColumn:function(t){return"object"==r()(this.columns)&&("boolean"!=typeof this.columns.show||this.columns.show)},getColName:function(t){if(this.columnsConfig&&void 0!==this.columnsConfig[t]){var e=this.columnsConfig[t];if("string"==typeof e.name&&e.name)return e.name}return t},getColClasses:function(t){var e="",n=this.tblSort.findIndex(function(e,n,i){return e.col==t});return-1!=n&&(e+="sort sort-"+this.tblSort[n].direct),e},getRowClasses:function(t){var e=[];if(this.blockRow(t)&&(e[e.length]="blocked"),void 0!==this.tblRowClasses[t]){if(Array.isArray(this.tblRowClasses[t]))n=this.tblRowClasses[t];else var n=this.tblRowClasses[t].trim().split(" ");if(n.length>0){var i=n.filter(function(t){return-1==e.indexOf(t)});i.length>0&&e.push.apply(e,s()(i))}}return e.join(" ")},setRowClasses:function(t,e){this.$set(this.tblRowClasses,t,e)},getCellClasses:function(t,e){var n=["editable"];if(this.columnEditable(e)||(n[0]="read-only"),void 0!==this.tblCellClasses[t]&&void 0!==this.tblCellClasses[t][e]){var i=this.tblCellClasses[t][e];if(Array.isArray(i))o=i;else var o=i.trim().split(" ");if(o.length>0){var l=o.filter(function(t){return-1==n.indexOf(t)});l.length>0&&n.push.apply(n,s()(l))}}return n.join(" ")},setCellClasses:function(t,e,n){void 0===this.tblCellClasses[t]&&(this.tblCellClasses[t]={}),this.tblCellClasses[t][e]=n},isRow:function(t){return void 0!==this.data[t]},isCell:function(t,e){return!!this.isRow(t)&&void 0!==this.data[t][e]},rows:function(){return Array.isArray(this.data)?this.data.length:0},cell:function(t,e){return this.isCell(t,e)?this.data[t][e]:null},row:function(t){return this.isRow(t)?this.data[t]:null},setCell:function(t,e,n){return!!this.isCell(t,e)&&(this.$set(this.data[t],e,n),!0)},setRow:function(t,e){return!!this.isRow(t)&&(this.$set(this.data,t,e),!0)},insertRow:function(t){if(this.isRow(t)){for(var e,n=arguments.length,i=new Array(n>1?n-1:0),o=1;o<n;o++)i[o-1]=arguments[o];(e=this.data).splice.apply(e,[t+1,0].concat(i))}},deleteRow:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.isRow(t)&&this.data.splice(t,e)},checkRow:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(null!==e){var n=!!e;return this.tblCheckedRows[t]=n,n}return void 0===this.tblCheckedRows[t]&&(this.tblCheckedRows[t]=!1),this.tblCheckedRows[t]},blockRow:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(null!==e){var n=!!e;return this.$set(this.tblBlockedRows,t,n),n&&this.ifEditStart&&this.editCell.row==t&&(this.data[this.editCell.row][this.editCell.col]=this.editCell.initial,this.onEndEdit()),n}return void 0===this.tblBlockedRows[t]&&(this.tblBlockedRows[t]=!1),!!this.tblBlockedRows[t]},load:function(t){return!!Array.isArray(t)&&(this.undo.clean(this),this.$set(this,data,t),!0)},registerEventListener:function(t,e){"object"!=r()(this.events[t])&&(this.events[t]=[]),this.events[t][this._events[t].length]=e},startEvent:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("object"==r()(this.events[t])){var n=this.events[t];for(var i in n)"function"==typeof n[i]&&n[i](e)}}},computed:{colsType:function(){return this.columns?"object"==r()(this.columns)?Array.isArray(this.columns)?1:2:void 0:0},columnsConfig:function(){if("object"==r()(this.columns)){var t={};if(Array.isArray(this.columns))for(var e in this.columns)t[e]={name:this.columns[e],type:"string",default:""};else t=this.columns;for(var n in t)if(void 0===t[n].type&&(t[n].type="string"),void 0===t[n].default)switch(t[n].type){case"number":t[n].default=0;break;default:t[n].default=""}return t}return!1},checkedAll:{get:function(){var t=this.data.length;if(0==t)return!1;for(var e=0;e<t;e++)if(void 0===this.tblCheckedRows[e]||!this.tblCheckedRows[e])return!1;return!0},set:function(t){for(var e=this.data.length,n=0;n<e;n++)this.$set(this.tblCheckedRows,n,!!t)}}},watch:{tblCheckedRows:function(t){for(var e={current:[]},n=this.data.length,i=0;i<n;i++)void 0!==t[i]?e.current[i]=t[i]:e.current[i]=!1;console.log("event-checked",e),this.$emit("event-checked",e),this.startEvent("event-checked",e)}},mounted:function(){var t=this;window.addEventListener("click",function(e){t.onEndEdit()})},provide:function(){var t=this;return{registerEventListener:this.registerEventListener,load:this.load,getColumnConfig:function(e){return t.columnsConfig?t.columnsConfig[e]:{}},isRow:this.isRow,isCell:this.isCell,cell:this.cell,setCell:this.setCell,rows:this.rows,row:this.row,setRow:this.setRow,insertRow:this.insertRow,deleteRow:this.deleteRow,getCellClasses:this.getCellClasses,getRowClasses:this.getRowClasses,setCellClasses:this.setCellClasses,setRowClasses:this.setRowClasses,getChecked:function(){for(var t=this.data.length,e=[],n=0;n<t;n++)void 0!==this.tblCheckedRows[n]?e[n]=this.tblCheckedRows[n]:e[n]=!1;return e},checkRow:this.checkRow,blockRow:this.blockRow}}},f=n(1),p=Object(f.a)(h,i,[],!1,null,null,null);p.options.__file="src/table.vue";e.default=p.exports},function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",["string"==t.inputType||"image"==t.inputType?n("input",{class:t.classes,style:t.styles,attrs:{type:"text"},domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)},click:function(e){return e.stopPropagation(),t.onClickInput(e)},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEndEdit(e)}}}):t._e(),t._v(" "),"number"==t.inputType?n("input",{class:t.classes,style:t.styles,attrs:{type:"number"},domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)},click:function(e){return e.stopPropagation(),t.onClickInput(e)},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEndEdit(e)}}}):t._e(),t._v(" "),"select"==t.inputType?n("select",{class:t.classes,style:t.styles,domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)},click:function(e){return e.stopPropagation(),t.onClickInput(e)}}},t._l(t.options,function(e,i){return n("option",{key:i,domProps:{value:i}},[t._v(t._s(e))])}),0):t._e()])};i._withStripped=!0;var o=n(0),s=n.n(o),l={name:"input-render",mixins:[n(2).default],inject:["getColumnConfig"],props:["value","columnKey"],data:function(){return{}},methods:{onEndEdit:function(){this.$emit("event-input-end-edit")},onClickInput:function(){return!1}},computed:{inputType:function(){var t="string",e=this.getColumnConfig(this.columnKey);return"object"==s()(e)&&void 0!==e.type&&(t=e.type),t},options:function(){if("select"==this.inputType){var t=this.getColumnConfig(this.columnKey);if("object"==s()(t.options)){var e={},n=Array.isArray(t.options);for(var i in t.options){var o=t.options[i];if("function"==typeof o){var l=o();n?e[l]=l:e[i]=l}else n?e[o]=o:e[i]=o}return e}}return{}}}},r=n(1),a=Object(r.a)(l,i,[],!1,null,null,null);a.options.__file="src/input-element.vue";e.default=a.exports},function(t,e,n){"use strict";n.r(e);var i=function(){var t=this.$createElement,e=this._self._c||t;return e("span",{class:this.classes,style:this.styles},["image"==this.viewType?[e("img",{staticStyle:{"max-width":"100%"},attrs:{src:this.view}})]:[this._v("\n        "+this._s(this.view)+"\n    ")]],2)};i._withStripped=!0;var o=n(0),s=n.n(o),l={name:"view-render",mixins:[n(2).default],inject:["getColumnConfig"],props:["value","columnKey"],data:function(){return{}},methods:{},computed:{viewType:function(){return void 0!==this.config.type&&"image"==this.config.type?this.config.type:"string"},config:function(){return this.getColumnConfig(this.columnKey)},options:function(){var t=this.config;if("object"==s()(t.options)){var e={},n=Array.isArray(t.options);for(var i in t.options){var o=t.options[i];if("function"==typeof o){var l=o();n?e[l]=l:e[i]=l}else n?e[o]=o:e[i]=o}return e}return{}},view:function(){var t=this.options;return Object.keys(t).length>0&&void 0!==t[this.value]?t[this.value]:this.value}}},r=n(1),a=Object(r.a)(l,i,[],!1,null,null,null);a.options.__file="src/view-element.vue";e.default=a.exports}])});