import * as Interfaces from '../../NamespaceDemo/intefaces';
// 05.04.01
export class UniversityLibrarian implements Interfaces.ILibrarian {
    name: string;
    email: string;
    department: string;

    assistCustomer(custName: string){
        console.log(`${this.name} is assisting ${custName}`);
    }
}