// https://dev.to/glebirovich/typescript-data-structures-stack-and-queue-hld

export interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
    isFull(): boolean;
    isEmpty(): boolean;
}