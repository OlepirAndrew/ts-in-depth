import { IBook, IPerson } from './intefaces';

// 05.05.01
type TPersonBook = IBook & IPerson;
// 05.05.03
type TBookOreUndefined = IBook | undefined;
// 04.05.01
type TBookProperties = keyof IBook;

export {TBookOreUndefined, TBookProperties, TPersonBook};