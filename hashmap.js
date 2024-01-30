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
    #checkBounds(index, length = this.buckets.length) {
        if (index < 0 || index >= length) {
            throw new Error("Trying to access index out of bound");
        }
    }

    #resizeBucketList(length) {
        let count = 0;
        for (let i = 0; i < this.buckets.length; i++)
            if (this.buckets[i]) count++;

        if (count >= this.buckets.length * this.loadFactor) {
            // Expand
            const newLength = length || this.buckets.length * 2;
            const tempBucket = [...Array(newLength)];
            
            // Recalculate key hash assignments
            const entries = this.entries();
            for (let i = 0; i < entries.length; i++) {
                const bucket = this.#verifyBucket(entries[i][0], newLength);
                tempBucket[bucket] = entries[i][1];
            }

            this.buckets = tempBucket;
        }
    }

    #verifyBucket(key, length = this.buckets.length) {
        if (length === this.buckets.length) this.#resizeBucketList();
        const bucket = this.hash(key) % length;
        this.#checkBounds(bucket, length);
        return bucket;
    }

    #kvPair(key) {
        const bucket = this.#verifyBucket(key);

        let results = [];
        if (this.buckets[bucket] && this.buckets[bucket].length > 0) {
            for (let i = 0; i < this.buckets[bucket].length; i++) {
                const k = this.buckets[bucket][i][0];
                if (k === key) {
                    results = this.buckets[bucket][i];
                    break;
                }
            }
        }
        else {
            this.buckets[bucket] = results;
        }
        return results;
    }

    set(key, value) {
        const kvPair = this.#kvPair(key);
        if (kvPair.length > 0) {
            kvPair[0] = key;
            kvPair[1] = value;
        }
        else {
            kvPair.push([key, value]);
        }
    }

    get(key) {
        const kvPair = this.#kvPair(key);
        let result = null;
        if (kvPair.length > 0)
            result = kvPair[1];
        return result;
    }

    has(key) {
        const kvPair = this.#kvPair(key);
        let results = false;
        if (kvPair.length > 0) results = true; 
        return results;
    }

    remove(key) {
        const bucket = this.#verifyBucket(key);
        if (this.buckets[bucket] && this.buckets[bucket].length > 0) {
            for (let i = 0; i < this.buckets[bucket].length; i++) {
                const k = this.buckets[bucket][i][0];
                if (k === key) {
                    this.buckets[bucket].splice(i, 1);
                    return true
                }
            }
        }
        return false
    }

    length() {
        let count = 0;
        for (let i = 0; i < this.buckets.length; i++)
            if (this.buckets[i]) 
                for (let j = 0; j < this.buckets[i].length; j++) 
                    if (this.buckets[i][j]) count++;

        return count;
    }

    clear() {
        this.buckets = [...Array(16)];
    }

    keys() {
        const keys = []
        for (let i = 0; i < this.buckets.length; i++)
            if (this.buckets[i]) 
                for (let j = 0; j < this.buckets[i].length; j++)
                    if (this.buckets[i][j])
                        keys.push(this.buckets[i][j][0]);   
        
        return keys;
    }

    values() {
        const values = []
        for (let i = 0; i < this.buckets.length; i++)
            if (this.buckets[i]) 
                for (let j = 0; j < this.buckets[i].length; j++)
                    if (this.buckets[i][j])
                        values.push(this.buckets[i][j][1]);    
        
        return values;
    }

    entries() {
        let entries = [];
        for (let i = 0; i < this.buckets.length; i++)
            if (this.buckets[i] && this.buckets[i].length > 0) entries = [...entries, ...this.buckets[i]];
        
        return entries;
    }
}

module.exports = HashMap;