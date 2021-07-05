import { configureStore, LoggerExtension, ReduxDevtoolsExtension, UndoExtension } from 'mini-rx-store';

import App from './App.svelte';
import { TodosStateService } from './todos/state/todos-state.service';

configureStore({extensions: [new ReduxDevtoolsExtension({}), new UndoExtension(), new LoggerExtension()]});
export const todoState = new TodosStateService();

const app = new App({
	target: document.body,
});

export default app;
