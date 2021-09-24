// ATTENTION: We have to initialize Feature Stores - which need to be available immediately - after calling `configureStore`

import {
    configureStore,
    ImmutableStateExtension,
    LoggerExtension,
    ReduxDevtoolsExtension,
} from 'mini-rx-store';
import { UserStore } from './modules/user/state/user-store';

// Store
export const store = configureStore({
    // TODO disable all extensions in PROD mode
    extensions: [
        new LoggerExtension(),
        new ImmutableStateExtension(),
        new ReduxDevtoolsExtension({}),
    ],
});

// Feature Stores
export const userStore: UserStore = new UserStore();
