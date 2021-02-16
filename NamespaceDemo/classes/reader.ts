import { IBook } from '../intefaces';

export class Reader {
    name: string;
    books: IBook[];

    take(book: IBook): void {
        this.books.push(book);
    }
}