class Container {
    static #count = 0;
    constructor(capacity) {
        Container.#count++;
        this.element = document.createElement("div");
        this.element.id = `container-${Container.#count}`;
        this.element.classList.add("container");
        this.element.style.width = `${capacity * 2}px`;
        this.element.style.height = `${capacity * 2}px`;
        // document.getElementById("page").appendChild(this.element);

        this.list = [];
        this.capacity = capacity;

        this.cargos = [];
    }

    add_cargo(cargo) {
        this.cargos.push(cargo);
        this.element.appendChild(cargo.element);
    }

    space_left() {
        if (this.cargos.length < 1) {
            return this.capacity;
        } else {
            return (
                this.capacity -
                this.cargos.reduce((sum, current) => (sum += current.weight), 0)
            );
        }
    }

    does_fit(cargo) {
        if (cargo.weight) {
            return cargo.weight <= this.space_left();
        }
        return cargo <= this.space_left();
    }
}

class Cargo {
    static #count = 0;
    constructor(weight) {
        this.id = Cargo.#count;
        Cargo.#count++;

        this.weight = weight;

        this.element = document.createElement("div");
        this.element.id = `cargo-${Cargo.#count}`;
        this.element.classList.add("cargo");
        this.element.style.width = `${weight * 2}px`;
        this.element.style.height = `${weight * 2}px`;
    }
}
