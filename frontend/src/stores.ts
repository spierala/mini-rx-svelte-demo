import {
    configureStore,
    ImmutableStateExtension,
    LoggerExtension,
    ReduxDevtoolsExtension,
    UndoExtension
} from 'mini-rx-store';
import { TodosStore } from './modules/todo/state/todos.store';

export const store = configureStore({
    extensions: [
        new ReduxDevtoolsExtension({}),
        new UndoExtension(),
        new LoggerExtension(),
        new ImmutableStateExtension()
    ]
});

export const todosStore = new TodosStore();
