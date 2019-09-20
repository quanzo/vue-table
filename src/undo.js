if (typeof (window.VueGlobalUndo) == "undefined") {
    window.VueGlobalUndo = {
        undo: [],
        components: [],
        push(component, state) {
            this.components.push(component);
            this.undo.push(state);
        },
        restore() {
            console.log("Ctrl+z");
            if (this.undo.length > 0) {
                let component = this.components.pop();
                let state = this.undo.pop();
                if (typeof (component.restoreState) == "function") {
                    component.restoreState(state);
                }
            }    
        },
        clean(component) { // delete state of component
            let count = 0;
            for (let i = this.components.length; i >= 0; i--) {
                if (this.components[i] === component) {
                    this.components.splice(i, 1);
                    count++;
                }
            }
            return count;
        }
    };
    window.addEventListener("keyup", function (e) {
        if (e.ctrlKey && e.code == "KeyZ" && !e.shiftKey) {
            VueGlobalUndo.restore();
        }
    });
}
export default window.VueGlobalUndo;
