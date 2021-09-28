import {
    configureStore,
    ImmutableStateExtension,
    LoggerExtension,
    ReduxDevtoolsExtension,
} from 'mini-rx-store';
import { UserStore } from './modules/user/state/user-store';
import { isProd } from './environment';

const extensions = isProd
    ? [new ReduxDevtoolsExtension({})] // Keep DevTools for Demo purposes
    : [new LoggerExtension(), new ImmutableStateExtension(), new ReduxDevtoolsExtension({})];

// Store
export const store = configureStore({
    extensions,
});

// Feature Stores
// ATTENTION: We have to initialize Feature Stores - which need to be available immediately - after calling `configureStore`
export const userStore: UserStore = new UserStore();
