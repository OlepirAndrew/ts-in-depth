// Compiled with --strictNullChecks

import * as assert from 'assert';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string): void {
    const elt: HTMLElement = document.getElementById(divName);
    if (typeof elt === 'object'){
        elt.innerText = `Hello from ${name}`;
    }
}

// 04. 02. 01.
interface DamageLogger {
    (reason: string): string;
}

// home work
// 02. 01. 01.
type TValue = string | number | boolean;

enum ECategory  { JavaScript, CSS, HTML, TypeScript, Angular }
// 04.01.01 / 04.01.07 /04.01.09
interface IBook {
    id: number;
    category: ECategory;
    available: boolean;
    author: string;
    title: string;
    pages?: number;
    // markDamaged?: (reason) => void;
    markDamaged?: DamageLogger;
}
// 04.01.02
function getAllBooks(): readonly IBook[]{

    const allBooksArr: readonly IBook[] = [
        { id: 1, category: ECategory.JavaScript, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true},
        { id: 2, category: ECategory.JavaScript, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false },
        { id: 3, category: ECategory.CSS, title: 'CSS Secrets', author: 'Lea Verou', available: true },
        { id: 4, category: ECategory.JavaScript, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true }
    ];

    return allBooksArr;
}

// console.log(getAllBooks());

function getBookAvailable(available: boolean){
    return (book: {available: boolean}) => book.available === available;
}

// 02. 01. 02.
function logFirstAvailable(books: readonly any[] = getAllBooks()): void{
    const availableBook: {[key: string]: TValue} = books.find(getBookAvailable(true));

    // console.log(`Books: ${books.length}, available: ${availableBook.title}`);
}

logFirstAvailable(getAllBooks());

// 02. 01. 06.
function getBookTitlesByCategory(category: ECategory = ECategory.JavaScript): Array<string>{
    return getAllBooks()
        .filter((book: {category: ECategory}) => book.category === category)
        .map((book: {title: string})=> book.title);
}

// 02. 01. 07.
function logBookTitles(arr: string[]): void {
    arr.forEach((bookName: string) => console.log(bookName));
}

// console.log(logBookTitles(getBookTitlesByCategory(ECategory.JavaScript)));

// 02. 01. 08.
function getBookAuthorByIndex(index: number): [string, string] {
    const books = getAllBooks();
    const {title, author} = books[index];

    return [title, author];
}

// console.log(getBookAuthorByIndex(1));

// 02. 01. 09.
function calcTotalPages(): bigint {
    const lib = <const> [
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];

    return  lib.reduce((pre: bigint, cur: {books: number; avgPagesPerBook: number}) => {
        return pre + BigInt(cur.books) * BigInt(cur.avgPagesPerBook);
    }, BigInt(0));

}

// console.log(calcTotalPages());

// 03.01.01
function createCustomerID(customerName: string, id: number): string {
    return `${customerName}-${id}`;
}

// 03.01.02
const myId: string = createCustomerID('Ann', 10);
// console.log(myId);

// 03.01.03
let idGenerator: (customerName: string, id: number) => string;
idGenerator = (customerName: string, id: number) => `${customerName}-${id}`;
idGenerator = createCustomerID;
// console.log(idGenerator('boris', 20))

// 03.02.01
function createCustomer(name: string, age?: number, city?: string ): void {
    // console.log(`customer name:${name}`)
    // if (age) console.log(`customer age:${age}`)
    // if (city) console.log(`customer age:${city}`)
}

createCustomer('vasya', 33, 'kharkiv');

// 03.02.04 / 04.01.03
function getBookById(bookId: number): TBookOreUndefined {
    return getAllBooks().find(book => book.id === bookId);
}

const bookById = getBookById(2);
// console.log(bookById);

// 03.02.05
const getTitlesBook = (book: { title: string }) => book.title;
function getCheckoutBooks(customer: string, ...booksId: number[]): string[]{
    // console.log(customer)
    const availableBooks = booksId.map(getBookById).filter(getBookAvailable(true)).map(getTitlesBook);

    return availableBooks.length ? availableBooks : ['no books available'];
}

const myBooks = getCheckoutBooks('Vasya',  2, 3, 4);
// console.log(myBooks)

// 03.03.02

function getBookByAuthor(author: string): (book) => boolean {
    return (book: IBook): boolean => book.author === author;
};

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];

function getTitles(...args: any[]): string[] {
    let availableBooks = ['no books available'];
    const books = getAllBooks();

    if (args.length === 1 && typeof args[0] === 'string'){
        availableBooks = books.filter(getBookByAuthor(args[0])).map(getTitlesBook);
    } else if  (args.length && typeof args[0] === 'boolean') {
        availableBooks =  books.filter(getBookAvailable(args[0])).map(getTitlesBook);
    } else if (args.length === 2) {
        const [id, available] = args;
        if(typeof id === 'number' && typeof available === 'boolean'){
            availableBooks = [getBookById(args[0])].filter(getBookAvailable(args[1])).map(getTitlesBook);
        }
    }

    return availableBooks;
}
// 03.03.03
const checkedOutBooks = getTitles('Liang Yuxian Eugene');
// console.log(checkedOutBooks);

// 03.03.04

function assertStringValue(value: any): asserts value is string{
    if (typeof value !== 'string') {
        throw new Error('value should have been a string');
    }
}

function bookTitleTransform(bookTitle: any): string {
    assertStringValue(bookTitle);

    return [...bookTitle].reverse().join('');
}

// console.log(bookTitleTransform(checkedOutBooks[0]));

// 04.01.04
function printBook(book: IBook): void {
    console.log(`${book.title} by ${book.author}`);
}

// 04.01.05 / 04.01.08
const myBook: IBook = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: ECategory.CSS,
    pages: 200,
    markDamaged: (reason: string) => `Damaged: ${reason}`
};

myBook.markDamaged('missing back cover');
// 04.01.06
// console.log(printBook(myBook));

// 04.02.03
const logDamage: DamageLogger = (reason: string) => `Damaged ${reason}`;

// 04.03.01
interface IPerson {
    name: string;
    email: string;
}

// 05.05.01
type TPersonBook = IBook & IPerson;
// 05.05.03
type TBookOreUndefined = IBook | undefined;

// 04.03.02
interface IAuthor extends IPerson {
    numBooksPublished: number;
}

// 04.03.03
interface ILibrarian extends IPerson {
    department: string;
    assistCustomer: (custName: string) => void;
}

// 04.03.04
const favoriteAuthor: IAuthor = {
    name: 'Volodimir',
    email: 'volodimir@gmail.com',
    numBooksPublished: 100
};

// 04.05.01
type TBookProperties = keyof IBook;

// 04.05.02
function getProperties(book: IBook, property: TBookProperties): any {
    return typeof book[property] === 'function' ? (book[property] as Function).name : book[property];
}

// 04.05.03
// console.log(getProperties(myBook, 'title'));
// console.log(getProperties(myBook, 'markDamaged'));
// console.log(getProperties(myBook, 'isbn'));

// 05.01.01
// 05.03.01
export abstract class ReferenceItem {
    // title: string;
    // year: number;
    private _publisher: string;
    // 05.01.05
    readonly #id: number;
    // 05.01.06
    static department: string = 'department';

    // constructor(
    //     newTitle: string,
    //     newYear: number
    // ) {
    //     console.log('Creating a new ReferenceItem...');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }

    // 05.01.03
    protected constructor(
        id: number,
        public title: string,
        protected year: number,
    ) {
        console.log('Creating a new ReferenceItem...');
        this.#id = id;
    }

    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        // 05.01.06
        console.log(ReferenceItem.department);
    }

    // 05.01.04
    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string){
        this._publisher = newPublisher;
    }

    getId(): number {
        return this.#id;
    }

    abstract abstractCitation(): void;
}
// 05.01.02
// const ref = new ReferenceItem(999, 'Title 2021', 2021);


// ref.publisher = 'setNewTitle';
// console.log(ref.publisher);
// console.log(ref);
// console.log(ref.getId());
// ref.printItem();

// 05.02.01
class Encyclopedia extends ReferenceItem {
    constructor(
        id: number,
        title: string,
        year: number,
        public edition: number,
    ) {
        super(id, title, year,);
    }
    // 05.02.03
    printItem() {
        super.printItem();
        console.log(`Edition: ${this.edition} ${this.year}`);
    }
    abstractCitation() {
        console.log(` ${this.title} ${this.year}`);
    }
}

// 05.02.02
const refBook = new Encyclopedia(99, 'title', 2020, 9, );
refBook.printItem();
console.log(refBook);
refBook.abstractCitation();

// 05.04.01
class UniversityLibrarian implements ILibrarian {
    name: string;
    email: string;
    department: string;
    constructor() {
    }

    assistCustomer(custName: string){
        console.log(`${this.name} is assisting ${custName}`);
    }
}
// 05.04.02
const favoriteLibrarian: ILibrarian = new UniversityLibrarian();
favoriteLibrarian.name = 'Franky';
favoriteLibrarian.assistCustomer('Bob');

// 05.05.02
const PersonalBook: TPersonBook = {
    name: 'Franky',
    email: 'franky@email.com',
    id: 1,
    category: ECategory.Angular,
    available: true,
    author: 'Franky ForFinger',
    title: 'someTitle'
};
