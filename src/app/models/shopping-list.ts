import { Item } from './item';

export class ShoppingList {

    public constructor(
        public done: boolean,
        public plannedFor: any,
        public iems: [Item]
    ) {}

}
