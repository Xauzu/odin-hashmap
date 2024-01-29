class HashMap {
    constructor(loadFactor) {
        this.buckets = [];
        this.loadFactor = loadFactor || 0.75;
    }

    // From Odin https://www.theodinproject.com/lessons/javascript-hashmap-data-structure#collisions
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }

    // Artificial index limitation
    // From Odin https://www.theodinproject.com/lessons/javascript-hashmap
    checkBounds(index) {
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
    }

    set(key, value) {

    }

    get(key) {

    }

    has(key) {

    }

    remove(key) {

    }

    length() {

    }

    clear() {

    }

    keys() {

    }

    values() {

    }

    entries() {

    }
}