let mmin1 = 1;

for (const cargo of cargo1) {
    mmin1 += cargo;
}

console.log(mmin1 / 100);
mmin1 = Math.ceil(mmin1 / 100);
console.log("mmin1 is", mmin1);

let mmin2 = 1;

for (const cargo of cargo2) {
    mmin2 += cargo;
}

console.log(mmin2 / 100);
mmin2 = Math.ceil(mmin2 / 100);
console.log("mmin2 is", mmin2);

let mmin3 = 1;

for (const cargo of cargo3) {
    mmin3 += cargo;
}

console.log(mmin3 / 100);
mmin3 = Math.ceil(mmin3 / 100);
console.log("mmin3 is", mmin3);

let mmin4 = 1;

for (const cargo of Array.from([...cargo1, ...cargo2, ...cargo3])) {
    mmin4 += cargo;
}

console.log(mmin4 / 100);
mmin4 = Math.ceil(mmin4 / 100);
console.log("mmin4 is", mmin4);
