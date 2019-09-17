Table - component for Vue.js
============================

[Demo](https://quanzo.github.io/vue-table/)

 

Install via NPM
---------------

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm i --save-dev @quanzo/vue-table
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Load from CDN
-------------

You can load specific version of package from [jsDelivr
CDN](https://cdn.jsdelivr.net/npm/@quanzo/vue-table).

`<script src="https://cdn.jsdelivr.net/npm/@quanzo/vue-table"></script>`

 

Methods provided by the component Table
---------------------------------------

| provide                                | return        | description                                                                                                                |
|----------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------------|
| registerEventListener(eventName, func) |               |                                                                                                                            |
| load(tableData)                        |               | Upload new data to the table.                                                                                              |
| getColumnConfig(col)                   | Object        |                                                                                                                            |
| isRow(row)                             | boolean       | Checks for row presence                                                                                                    |
| isCell(row, col)                       | boolean       | Checks for cell presence                                                                                                   |
| cell(row, col)                         | mixed         |                                                                                                                            |
| setCell(row, col, value)               | boolean       |                                                                                                                            |
| rows()                                 | integer       | Total count rows in table                                                                                                  |
| row(row)                               | array\|object | Get row data                                                                                                               |
| setRow(row, value)                     | boolean       | Set row data. Value is array or object/                                                                                    |
| insertRow(afterRow, ...value)          |               | Insert rows after row. afterRow =-1 then insert at the beginning of the array                                              |
| deleteRow(row, count = 1)              |               | Delete lines starting from this                                                                                            |
| getCellClasses(row, col)               | string        | Get cell classes                                                                                                           |
| getRowClasses                          | string        | Get row classes                                                                                                            |
| setCellClasses(row, col, classes)      |               | Set cell classes                                                                                                           |
| setRowClasses(row, classes)            |               | Set row classes                                                                                                            |
| getChecked()                           | array         | Returns the status checked of each row in an array. Array index - line number. Value - if checked = true, other = false    |
| checkRow(row, status = null)           | boolean       | Get or set selection mark. If status == true/false - set or reset mark                                                     |
| blockRow                               | boolean       | Set or reset row lock. If the line is locked, then its editing is prohibited. If status == true/false - set or reset block |
|                                        |               |                                                                                                                            |

 

Events
------

| event               | \$emit | event params                                                            | description                                         |
|---------------------|--------|-------------------------------------------------------------------------|-----------------------------------------------------|
| event-end-edit-cell | yes    | {row: ..., col: ..., initial: ..., result: ..., data: ...}              | The event will be triggered after editing the cell. |
| event-sort-table    | yes    | [{col: ..., direct: "asc\|desc"}, ... {col: ..., direct: "asc\|desc"} ] | The event will be triggered after sorting.          |
| event-checked       | yes    | {current: []}                                                           | The event will be triggered after checked row.      |
|                     |        |                                                                         |                                                     |

 

Options
-------

| param         | type    | default | sample                                                                                                                                                                                                           | description                                                                                                                                                         |
|---------------|---------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| data          | array   | []      |                                                                                                                                                                                                                  | Data to display in the table. Array of strings. A string can be an array or a data object.                                                                          |
| columns       | array   | false   | [”ID”, “Name”, “Family”]                                                                                                                                                                                         | Data on the columns of the table. If an array, then these are the column headers. If the object is advanced settings. If not, column headers will not be displayed. |
| columns       | object  | false   | {ID: {name:”Identify”, enableEdit: false, enableSort: false, type:”number”}, town: {name:”Company town”, enableEdit: true, enableSort: true, type: “select”, options: {msk: “Moscow”, spb: “Snakt-Petersburg”}}} | Данные по колонкам таблицы. Если массив, то это заголовки колонок. Если объект - то это расширенные настройки. Если нет - заголовоки колонок выведены не будут.     |
| useUndo       | boolean | true    |                                                                                                                                                                                                                  | Activate ctrl+z                                                                                                                                                     |
| defEnableEdit | boolean | true    |                                                                                                                                                                                                                  | Default value enableEdit param for column                                                                                                                           |
| defEnableSort | boolean | true    |                                                                                                                                                                                                                  | Default value enableSort param for column                                                                                                                           |
| enableChecked | boolean | true    |                                                                                                                                                                                                                  | Whether or not line marking is available.                                                                                                                           |
| sort          | array   | []      | [{col:”name”, direct:”asc”}, {col:”id”, direct:”desc”}]                                                                                                                                                          |                                                                                                                                                                     |
| checkedRows   | array   | []      | [false, true]                                                                                                                                                                                                    | Checked row number 1.                                                                                                                                               |
| blockedRows   | array   | []      | [false, false, true]                                                                                                                                                                                             | Block row number 2                                                                                                                                                  |
| cellClasses   | array   | []      |                                                                                                                                                                                                                  |                                                                                                                                                                     |
| rowClasses    | array   | []      | [”marked checked”, ”not-marked”, “”, “”]                                                                                                                                                                         |                                                                                                                                                                     |
|               |         |         |                                                                                                                                                                                                                  |                                                                                                                                                                     |

 

Available types of columns
--------------------------

### type = string

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
...
name: {
    name:”User name”,
    enableEdit: false,
    enableSort: false,
    type:”string” // or do not set the parameter
}
...
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### type = number

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
...
id: {
    name:”Identify”,
    enableEdit: false,
    enableSort: false,
    type:”number”
}
...
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### type = select

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
...
town: {
    name:”Company town”,
    enableEdit: true,
    enableSort: true,
    type: “select”,
    options: {
	msk: “Moscow”,
	spb: “Sankt-Petersburg”
    }
}
...
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
