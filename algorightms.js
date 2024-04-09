// Базовий клас зі спільним функціоналом алгоритмів розміщення
class FitAlgorithm {
    // Ініціалізація об'єкта. В ньому є:
    // 		*- cargo				-- Список вантажів, що треба розмістити.
    // 		*- container_capacity   -- Ємність одного контейнера.
    // 		*- current_cargo		-- Індекс поточного вантажа.
    // 		*- current_container	-- Індекс поточного контейнера.
    // 		*- containers			-- Список контейнерів.
    constructor(cargo, container_capacity) {
        this.cargo = Array.from(cargo);

        // Одразу додаємо один порожній контейнер.
        this.containers = [new Container(container_capacity)];
        this.container_capacity = container_capacity;

        this.current_cargo = 0;
        this.current_container = 0;

        this.complexity = 0;
    }

    // Один крок/ітерація алгоритму.
    step() {
        // Тільки виконуємо ітерації, якщо ще є нерозміщені вантажі.
        if (this.current_cargo < this.cargo.length) {
            this.putInContainer();
            // Беремо наступний вантаж
            this.current_cargo++;
            return { status: "in process", progress: this.current_cargo };
        } else {
            return { status: "finished" };
        }
    }

    // Беремо наступний контейнер.
    getNextContainer() {
        this.createNewContainer();
    }

    // Створюємо новий контейнер.
    createNewContainer() {
        const container = new Container(this.container_capacity);
        this.containers.push(container);
        this.current_container = this.containers.length - 1;
    }

    // Кладемо в контейнер.
    putInContainer() {}
}

// Алгоритм "заповнення наступного"
class NFA extends FitAlgorithm {
    // Задаємо логіку укладання вантажу в контейнер.
    putInContainer() {
        // Вага поточного вантажа.
        const current_cargo_weight = this.cargo[this.current_cargo];

        // Якщо вантаж не поміщається, беремо наступний контейнер (створюємо новий).
        if (
            !this.containers[this.current_container].does_fit(
                current_cargo_weight,
            )
        ) {
            this.getNextContainer();
        }

        // Власне, додаємо вантаж до контейнера.
        this.containers[this.current_container].add_cargo(
            new Cargo(current_cargo_weight),
        );

        this.complexity++;
    }
}

// Алгоритм "заповнення першого, що підходить".
class FFA extends NFA {
    // Тут міняємо логіку, по якій беремо наступний контейнер.
    // Замість того, щоб створювати новий, спершу пробуємо помістити в один із наявних.
    getNextContainer() {
        // Проходимося по усіх контейнерах і перевіряємо.
        for (let i = 0; i < this.containers.length; i++) {
            this.current_container = i;

            // Якщо знайдено такий, в який поміщається поточний вантаж.
            if (
                this.containers[i].space_left() >=
                this.cargo[this.current_cargo]
            ) {
                // Перериваємо цикл, адже ми вже задали індекс поточного контейнера.
                return;
            }
            this.complexity++;
        }

        // Якщо цикл не було перервано, значить не було знайдено підходящого контейнера,
        // Тому створюємо новий.
        this.createNewContainer();
    }
}

// Алгоритм "заповнення найменш повного"
class WFA extends NFA {
    // Для вибору наступного контейнера шукаємо найменш повний з уже існуючих.
    getNextContainer() {
        this.find_min_container();
    }

    // Шукаємо найменш повний контейнер.
    find_min_container() {
        // Поточний найменш повний контейнер.
        let min = this.containers[0];

        // Проходимося по усіх контейнерах.
        for (let i = 0; i < this.containers.length; i++) {
            // Якщо поточний найменш повний заповнений менше, ніж той, до якого дійшла ітерація,
            // а також якщо в останньому з них є достатньо місця, ставимо його як поточний найменш повний.
            if (
                min.space_left() < this.containers[i].space_left() &&
                this.containers[i].does_fit(this.cargo[this.current_cargo])
            ) {
                min = this.containers[i];
                this.current_container = i;
            }
            this.complexity++;
        }

        // Якщо так і не було обрано контейнера, в який поміщається вантаж,
        // створюємо новий контейнер.
        if (
            !this.containers[this.current_container].does_fit(
                this.cargo[this.current_cargo],
            )
        ) {
            this.createNewContainer();
        }
    }
}

// Алгоритм "заповнення найбільш повного"
// В загальному все те ж саме, що і в WFA, за винятком знаходження контейнера.
class BFA extends WFA {
    getNextContainer() {
        this.find_max_container();
    }

    find_max_container() {
        let max = this.containers[0];
        for (let i = 0; i < this.containers.length; i++) {
            if (
                // Контейнер підходить, якщо:
                // 		В ньому якомого менше місця І ТАКОЖ в нього поміщається поточний вантаж
                // 		АБО
                //		в поточний обраний контейнер не поміщається поточний вантаж.
                (max.space_left() > this.containers[i].space_left() &&
                    this.containers[i].does_fit(
                        this.cargo[this.current_cargo],
                    )) ||
                !max.does_fit(this.cargo[this.current_cargo])
            ) {
                max = this.containers[i];
                this.current_container = i;
            }
            this.complexity++;
        }
        if (
            !this.containers[this.current_container].does_fit(
                this.cargo[this.current_cargo],
            )
        ) {
            this.createNewContainer();
        }
    }
}
