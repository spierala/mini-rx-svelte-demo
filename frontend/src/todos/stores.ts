import {
    configureStore,
    ImmutableStateExtension,
    LoggerExtension,
    ReduxDevtoolsExtension,
    UndoExtension
} from 'mini-rx-store';
import { TodoStore } from './state/todo.store';

// Important: Call configureStore before initializing any FeatureStores!
configureStore({
    extensions: [
        new ReduxDevtoolsExtension({}),
        new UndoExtension(),
        new LoggerExtension(),
        new ImmutableStateExtension()
    ]
});

export const todoStore = new TodoStore();
