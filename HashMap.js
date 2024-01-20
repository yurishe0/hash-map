export default class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.array = Array(this.capacity);
    }

    length() {
        return this.array.filter(e => e != null).length;
    }

    hash(string) {
        let hashCode = 0;

        const primeNumber = 23;
        for (let i = 0; i < string.length; i++) {
            hashCode = primeNumber * hashCode + string.charCodeAt(i);
        }

         return hashCode % this.array.length;
    }

    set(key, value) {
        if (this.length() / this.capacity >= this.loadFactor) this.resize();

        const index = this.hash(key);
        this.array[index] = [key, value];
    }

    get(key) {
        let value = this.array[this.hash(key)];
        return value ? value[1] : null;
    }

    has(key) {
        return this.get(key) ? true : false;
    }

    remove(key) {
        if(this.has(key)) {
            this.array[this.hash(key)] = null;
            return true;
        }
        return false;
    }

    clear() {
        this.capacity = 16;
        this.array = Array(this.capacity);
    }

    keys() {
        return this.array.filter(e => e != null).map(e => e[0]);
    }

    values() {
        return this.array.filter(e => e != null).map(e => e[1]);
    }

    entries() {
        return this.array.filter(e => e != null);
    }

    resize() {
        let copy = this.array;
        this.capacity *= 2;
        this.array = Array(this.capacity);
        copy.forEach(element => {
            this.set(element[0], element[1]);
        });
    }
}
