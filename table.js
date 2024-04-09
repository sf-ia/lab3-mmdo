class CargoTable {
    static exists = false;
    constructor(containers, cargo_count) {
        console.log("cnt", containers);
        this.cargo_count = containers.reduce((sum, item) => {
            return sum + item.cargos.length;
        }, 0);
        // this.cargo_count = cargo_count;
        console.log("cargo count", this.cargo_count);
        this.containters = containers;

        this.element = document.createElement("div");
        this.element.id = "cargo-table";
        this.element.style.gridTemplateRows = `repeat(${containers.length + 1}, 1fr)`;
        this.element.style.gridTemplateColumns = `repeat(${this.cargo_count + 1}, 1fr)`;

        document.getElementById("wrapper").appendChild(this.element);
        CargoTable.exists = true;

        // this.initialize();
    }

    initialize() {
        // Element in the corner
        const header_element = document.createElement("div");
        const cont = document.createElement("span");
        const car = document.createElement("span");

        cont.innerText = "Cont.";
        car.innerText = "Cargo";

        header_element.append(cont, car);
        header_element.classList.add("ct-header");
        this.element.appendChild(header_element);

        // First row
        for (let i = 0; i < this.cargo_count; i++) {
            const el = document.createElement("div");
            el.innerText = i + 1;
            el.classList.add("ct-cargo-index-el");
            this.element.appendChild(el);
        }
    }

    fill() {
        // Element in the corner
        const header_element = document.createElement("div");
        const cont = document.createElement("span");
        const car = document.createElement("span");

        cont.innerText = "Cont.";
        car.innerText = "Cargo";

        header_element.append(cont, car);
        header_element.classList.add("ct-header");
        this.element.appendChild(header_element);

        // First row
        for (let i = 0; i < this.cargo_count; i++) {
            const el = document.createElement("div");
            el.innerText = i + 1;
            el.classList.add("ct-cargo-index-el");
            this.element.appendChild(el);
        }

        console.log("CONTAINERS", this.containters);

        // Main content
        for (let i = 0; i < this.containters.length; i++) {
            console.log("==== ITER I", i);
            // Container index
            const container_el = document.createElement("div");
            container_el.innerText = i + 1;
            container_el.classList.add("ct-cont-el");

            this.element.appendChild(container_el);

            const cargos = this.containters[i].cargos;

            for (let j = 0; j < this.cargo_count; j++) {
                const el = document.createElement("div");
                const found_cargo = cargos.find((item) => item.id === j);

                // console.log("FOUND CARGO", found_cargo);
                if (found_cargo !== undefined) {
                    el.innerText = found_cargo.weight;
                    el.classList.add("ct-cargo");
                } else {
                    el.innerText = "";
                    el.classList.add("empty-el");
                }
                this.element.appendChild(el);
            }
        }

        console.log(this.element);
    }
}
