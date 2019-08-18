import { Item } from './item';

export class ShoppingList {

    public constructor(
        public belongs_to: string,
        public items: Item[],
        public planned_for: string
    ) {}
}
