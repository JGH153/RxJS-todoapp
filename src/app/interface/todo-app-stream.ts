import { TodoAppItem } from './todo-app-item'
export interface TodoAppStream {
    editId: null | number;
    addItemActive: boolean;
    todoListChanged: boolean;
    todoItems: TodoAppItem[];
}
