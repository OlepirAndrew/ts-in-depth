import { ReferenceItem } from './referenceItem';

// 05.02.01 06.03.01 06.03.02
export default class Encyclopedia extends ReferenceItem {
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