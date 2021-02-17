/* Compiled with --strictNullChecks */
/* eslint-disable no-redeclare */

import * as Interfaces from '../NamespaceDemo/intefaces';
import * as Types from '../NamespaceDemo/types';
import { ECategory } from '../NamespaceDemo/enums';

import {
    logFirstAvailable,
    getAllBooks,
    createCustomer,
    getBookById,
    getCheckoutBooks,
    getTitles,
    getBookTitlesByCategory,
    logBookTitles,
    calcTotalPages,
    createCustomerID,
    getBookAuthorByIndex,
    bookTitleTransform,
    printBook,
    getProperties
} from '../NamespaceDemo/functions';

import { UniversityLibrarian, RefBook, Reader, Shelf } from './classes';
import type { Library } from './classes';
import { purge } from '../NamespaceDemo/functions';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string): void {
    const elt: HTMLElement = document.getElementById(divName);
    if (typeof elt === 'object'){
        elt.innerText = `Hello from ${name}`;
    }
}

// home work


console.log(getAllBooks());
logFirstAvailable(getAllBooks());
console.log(logBookTitles(getBookTitlesByCategory(ECategory.JavaScript)));
console.log(getBookAuthorByIndex(1));
console.log(calcTotalPages());

// 03.01.02
const myId: string = createCustomerID('Ann', 10);
console.log(myId);

// 03.01.03
let idGenerator: (customerName: string, id: number) => string;
idGenerator = (customerName: string, id: number) => `${customerName}-${id}`;
idGenerator = createCustomerID;
console.log(idGenerator('Boris', 20));
createCustomer('vasya', 33, 'kharkiv');
const bookById = getBookById(2);
console.log(bookById);
const myBooks = getCheckoutBooks('Vasya',  2, 3, 4);
console.log(myBooks);
// 03.03.03
const checkedOutBooks = getTitles('Liang Yuxian Eugene');
console.log(checkedOutBooks);
console.log(bookTitleTransform(checkedOutBooks[0]));
// 04.01.05 / 04.01.08
const myBook: Interfaces.IBook = {
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
console.log(printBook(myBook));

// 04.02.03
const logDamage:  Interfaces.Logger = (reason: string) => `Damaged ${reason}`;

// 04.03.04
const favoriteAuthor: Interfaces.IAuthor = {
    name: 'Volodimir',
    email: 'volodimir@gmail.com',
    numBooksPublished: 100
};

// 04.05.03
console.log(getProperties(myBook, 'title'));
console.log(getProperties(myBook, 'markDamaged'));
// console.log(getProperties(myBook, 'isbn'));

// 05.01.02
// const ref = new ReferenceItem(999, 'Title 2021', 2021);
// ref.publisher = 'setNewTitle';
// console.log(ref.publisher);
// console.log(ref);
// console.log(ref.getId());
// ref.printItem();

// 05.02.02
const refBook = new RefBook(99, 'title', 2020, 9, );
refBook.printItem();
console.log(refBook);
refBook.abstractCitation();


// 05.04.02
const favoriteLibrarian: Interfaces.ILibrarian = new UniversityLibrarian();
favoriteLibrarian.name = 'Franky';
favoriteLibrarian.assistCustomer('Bob');

// 05.05.02
const PersonalBook: Types.TPersonBook = {
    name: 'Franky',
    email: 'franky@email.com',
    id: 1,
    category: ECategory.Angular,
    available: true,
    author: 'Franky ForFinger',
    title: 'someTitle'
};

// 06.05

async function getClass<T>(myPath: string, myClass: string): Promise<T>{
    return import('./classes').then(module =>
        new module[myClass]()
    );
}

const newReader: Reader = await getClass<Reader>('../NamespaceDemo/classes','Reader');
console.log(newReader);


// 06.06.05
const library: Library = {
    id: 1,
    name: 'Name',
    address: 'Address'
};

// 07.01.04
const inventory: Interfaces.IBook[] = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: ECategory.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: ECategory.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: ECategory.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: ECategory.Software }
];

// 07.01.05
// const result: Interfaces.IBook[] = purge<Interfaces.IBook>(inventory);
// console.log(result);

// 07.02.06
const bookShelf = new Shelf<Interfaces.IBook>();
inventory.forEach((book: Interfaces.IBook) => bookShelf.add(book));
console.log(bookShelf.getFirst());
// 07.02.07
const magazines: Interfaces.IMagazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];
// 07.02.07
const magazineShelf = new Shelf<Interfaces.IMagazine>();
magazines.forEach((mag: Interfaces.IMagazine) => magazineShelf.add(mag));
console.log(magazineShelf.getFirst());