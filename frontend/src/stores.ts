import {
    configureStore,
    ImmutableStateExtension,
    LoggerExtension,
    ReduxDevtoolsExtension,
    UndoExtension,
} from 'mini-rx-store';
import { UserStore } from './modules/user/state/user-state.service';

// Store
export const store = configureStore({
    extensions: [
        new ReduxDevtoolsExtension({}),
        new UndoExtension(),
        new LoggerExtension(),
        new ImmutableStateExtension(),
    ],
});

// Feature Store Instances
export const userStore: UserStore = new UserStore();
