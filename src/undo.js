if (typeof (window.VueGlobalUndo) == "undefined") {
    window.VueGlobalUndo = {
        undo: [],
        components: [],
        push(component, state) {
            this.components.push(component);
            this.undo.push(state);
        },
        restore() {
            if (this.undo.length > 0) {
                let component = this.components.pop();
                let state = this.undo.pop();
                if (typeof (component.restoreState) == "function") {
                    component.restoreState(state);
                }
            }    
        }
    };
    window.addEventListener("keyup", function (e) {
        if (e.ctrlKey && (e.key == "Z" || e.key == "z")) {
            VueGlobalUndo.restore();
        }
    });
}
export default window.VueGlobalUndo;
