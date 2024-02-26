// https://dev.to/glebirovich/typescript-data-structures-stack-and-queue-hld

export abstract class Collection<T> {
    protected storage: T[] = [];

    clear(): void {
        this.storage = [];
    }

    size(): number {
        return this.storage.length;
    }

    isEmpty(): boolean {
        return this.storage.length == 0;
    }

    abstract isFull(): boolean;
}