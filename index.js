const cargo1 = [
    5, 25, 85, 27, 36, 5, 46, 29, 13, 57, 24, 95, 82, 45, 14, 67, 34, 64, 43,
    50,
];

const cargo2 = [
    87, 8, 76, 78, 88, 84, 3, 51, 54, 99, 32, 60, 76, 68, 39, 12, 26, 86, 94,
    39,
];

const cargo3 = [
    95, 70, 24, 78, 67, 1, 97, 2, 17, 92, 52, 56, 1, 80, 86, 41, 65, 89, 44, 19,
];

const all_cargos = [...cargo1, ...cargo2, ...cargo3];

/* cargo1.sort();
cargo2.sort();
cargo3.sort(); */

const test_cargo = [23, 3, 51, 20, 51, 42, 52, 12, 4, 7, 59, 58, 25, 94, 18];

const b = new FFA(all_cargos, 100);
// const b = new FFA(cargo1, 100);
// const b = new WFA(cargo1, 100);
// const b = new BFA(cargo1, 100);

function do_step() {
    const result = b.step();
    console.log("resss", result);
    if (result.status === "finished") {
        const ct = new CargoTable(b.containers);
        ct.fill();
        return true;
    }
}

while (true) {
    const res = do_step();
    if (res) {
        break;
    }
}

console.log("bbbbb", b);
