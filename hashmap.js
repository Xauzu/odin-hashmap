class HashMap {
    constructor(loadFactor) {
        this.buckets = [...Array(16)];
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
    #checkBounds(index) {
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
    }

    #resizeBucketList() {
        const count = this.length();

        if (count >= this.buckets.length * this.loadFactor) {
            // Expand
            const newLength = this.buckets.length * 2;
            const tempBucket = [...Array(newLength)];
            
            // Recalculate key hash assignments
            const entries = entries();
            for (let i = 0; i < entries.length; i++) {
                const bucket = this.#verifyBucket(entries[i][0], newLength);
                tempBucket[bucket] = entries[i][1];
            }

            this.buckets = tempBucket;
        }
    }

    #verifyBucket(key, length = this.buckets.length) {
        const bucket = hash(key) % length;
        this.#checkBounds(bucket);
        return bucket;
    }

    set(key, value) {
        const bucket = this.#verifyBucket(key);
        this.buckets[bucket] = value;
    }

    get(key) {
        const bucket = this.#verifyBucket(key);
        return this.buckets[bucket];
    }

    has(key) {
        const bucket = this.#verifyBucket(key);
        return this.buckets[bucket] ? true : false;
    }

    remove(key) {
        const bucket = this.#verifyBucket(key);
    }

    length() {
        let count = 0;
        for (let i = 0; i < this.buckets.length; i++) 
            if (this.buckets[i]) count++;

        return count;
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