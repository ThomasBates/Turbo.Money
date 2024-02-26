// https://dev.to/glebirovich/typescript-data-structures-stack-and-queue-hld

export interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    size(): number;
    isFull(): boolean;
    isEmpty(): boolean;
}