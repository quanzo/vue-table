export default {
    name: "slave-test",
    inject: ["isRow", "isCell", "cell", "setCell", "rows", "row", "setRow"],

    data() {
        return {
            
        };
    },

    methods: {
        tick() {
            let r1 = this.rnd(0, this.rowcounts-1);
            let r2 = this.rnd(0, this.rowcounts-1);
            console.log("tick", r1 + "<=>" + r2);
            let rw1 = this.row(r1);            
            let rw2 = this.row(r2);
            //console.log(rw1, rw2);
            console.log(this.setRow(r1, rw2));
            console.log(this.setRow(r2, rw1));
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

    mounted() {
        var component = this;
        setInterval(component.tick, 1000);
    }
};