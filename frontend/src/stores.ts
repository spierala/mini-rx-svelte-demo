import {
    configureStore,
    ImmutableStateExtension,
    LoggerExtension,
    ReduxDevtoolsExtension,
    UndoExtension
} from 'mini-rx-store';
import { TodosStore } from './modules/todo/state/todos.store';

// Store
export const store = configureStore({
    extensions: [
        new ReduxDevtoolsExtension({}),
        new UndoExtension(),
        new LoggerExtension(),
        new ImmutableStateExtension()
    ]
});

// Feature Stores
export const todosStore = new TodosStore();
