export default {
    name: "slave-test",
    inject: ["isRow", "isCell", "cell", "setCell", "rows", "row", "setRow", "setCellClasses", "setRowClasses", "getCellClasses", "getRowClasses"],

    data() {
        return {
            
        };
    },

    methods: {
        tick() {
            var cols = [
                "id", "name", "family", "country", "town", "img"
            ];
            let r1 = this.rnd(0, this.rowcounts - 1);
            let r2 = this.rnd(0, this.rowcounts - 1);
            let c1 = this.rnd(0, 5);
            let c2 = this.rnd(0, 5);
            let cls1 = "class" + this.rnd(1, 5);
            let cls2 = "class" + this.rnd(1, 5);

            //console.log("tick", r1 + "<=>" + r2);
            let rw1 = this.row(r1);            
            let rw2 = this.row(r2);
            //console.log(rw1, rw2);
            this.setRow(r1, rw2);
            this.setRow(r2, rw1);
            this.setCellClasses(r1, cols[c1], cls1);
            this.setCellClasses(r2, cols[c2], cls2);

        },
        rnd(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
        }
    },

    computed: {
        rowcounts() {
            return this.rows();
        }
    },

    render() { },

    mounted() {
        var component = this;
        setInterval(component.tick, 1000);
    }
};