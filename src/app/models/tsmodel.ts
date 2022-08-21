import { expand } from "rxjs";


export interface Person {
    name: string;
    surname: string;
    age: number;
}


const person: Person = {
    name: 'levani',
    surname: 'doldize',
    age: 16
}
type Acces = Person['name']
type Query = keyof Person;







