// https://dev.to/glebirovich/typescript-data-structures-stack-and-queue-hld

import { IQueue } from "./IQueue";
import { Collection } from "./Collection";

export class Queue<T> extends Collection<T> implements IQueue<T> {

    constructor(private capacity: number = Infinity) {
        super();
    }

    enqueue(item: T): void {
        if (this.isFull()) {
            throw Error("Queue has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }

    dequeue(): T | undefined {
        return this.storage.shift();
    }

    undequeue(item: T): void {
        if (this.isFull()) {
            throw Error("Queue has reached max capacity, you cannot add more items");
        }
        this.storage.unshift(item);
    }

    peek(): T | undefined {
        return this.storage[0];
    }

    isFull(): boolean {
        return this.capacity === this.size();
    }
}

/*
const queue = new Queue<string>();

queue.enqueue("A");
queue.enqueue("B");

queue.size();    // Output: 2
queue.dequeue(); // Output: "A"
queue.size();    // Output: 1
*/