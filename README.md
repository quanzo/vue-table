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
CDN](https://cdn.jsdelivr.net/npm/@quanzo/personality@2.0.0).

`<script src="https://cdn.jsdelivr.net/npm/@quanzo/vue-table"></script>`

 

Methods provided by the component Table
---------------------------------------

| provide                                | component method      | return  | description                   |
|----------------------------------------|-----------------------|---------|-------------------------------|
| registerEventListener(eventName, func) | registerEventListener |         |                               |
| load(tableData)                        | load                  |         | Upload new data to the table. |
| getColumnConfig(col)                   |                       | Object  |                               |
| isRow(row)                             |                       | boolean |                               |
| isCell(row, col)                       |                       | boolean |                               |
| cell(row, col)                         |                       | mixed   |                               |
| setCell(row, col, value)               |                       | boolean |                               |
| rows()                                 |                       | integer |                               |

 

Events
------

| event               | \$emit | event params                                                            | description                                         |
|---------------------|--------|-------------------------------------------------------------------------|-----------------------------------------------------|
| event-end-edit-cell | yes    | {row: ..., col: ..., initial: ..., result: ..., data: ...}              | The event will be triggered after editing the cell. |
| event-sort-table    | yes    | [{col: ..., direct: "asc\|desc"}, ... {col: ..., direct: "asc\|desc"} ] | The event will be triggered after sorting.          |
|                     |        |                                                                         |                                                     |

 

Options
-------

| param         | type          | default | description                                                                                                                                                                                                                                                                                                                         |
|---------------|---------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| data          | array         | []      | Data to display in the table. Array of strings. A string can be an array or a data object.                                                                                                                                                                                                                                          |
| columns       | array\|object | false   | Data on the columns of the table. If an array, then these are the column headers. If the object is advanced settings. If not, column headers will not be displayed. Данные по колонкам таблицы. Если массив, то это заголовки колонок. Если объект - то это расширенные настройки. Если нет - заголовоки колонок выведены не будут. |
| useUndo       | boolean       | true    |                                                                                                                                                                                                                                                                                                                                     |
| defEnableEdit | boolean       | true    |                                                                                                                                                                                                                                                                                                                                     |
| defEnableSort | boolean       | true    |                                                                                                                                                                                                                                                                                                                                     |
|               |               |         |                                                                                                                                                                                                                                                                                                                                     |

 
