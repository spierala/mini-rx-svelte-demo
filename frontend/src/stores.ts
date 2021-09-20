import {
    configureStore,
    ImmutableStateExtension,
    LoggerExtension,
    ReduxDevtoolsExtension,
    UndoExtension
} from 'mini-rx-store';

// Store
export const store = configureStore({
    extensions: [
        new ReduxDevtoolsExtension({}),
        new UndoExtension(),
        new LoggerExtension(),
        new ImmutableStateExtension()
    ]
});
