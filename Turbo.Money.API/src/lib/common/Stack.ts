// https://dev.to/glebirovich/typescript-data-structures-stack-and-queue-hld

import { IStack } from "./IStack";
import { Collection } from "./Collection";

export class Stack<T> extends Collection<T> implements IStack<T> {
    constructor(private capacity: number = Infinity) {
        super();
    }

    push(item: T): void {
        if (this.isFull()) {
            throw Error("Stack has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }

    pop(): T | undefined {
        return this.storage.pop();
    }

    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }

    isFull(): boolean {
        return this.capacity === this.size();
    }
}

/*
const stack = new Stack<string>();
stack.push("A");
stack.push("B");

stack.size(); // Output: 2
stack.peek(); // Output: "B"
stack.size(); // Output: 2
stack.pop();  // Output: "B"
stack.size(); // Output: 1
*/