# MiniRx Store Demo (Svelte)
## See the MiniRx Redux Api and the Feature Stores in Action

MiniRx is a Redux Store based on RxJS.

RxJS plays nicely with Svelte.

MiniRx Store has some advantages compared to the native Svelte writable/readable/derived stores.

- State and state changes can be inspected with Redux Dev Tools
- Immutablity of state can be enforced with the Immutable Extension: With immutable state we can be sure that state changes are done explicitly (using `setState` or by dispatching an Action)
- Memoized selectors reduce the amount of calculations for derived state
- State is exposed as RxJS Observable. We can take advantage of RxJS operators to transform and combine state
- MiniRx has a RxJS-based side effects model: Let the action stream trigger side effects like API calls and handle race conditions with RxJS flattening operators

🤓 Learn more about MiniRx on the [docs site](https://spierala.github.io/mini-rx-store)

Give it a ⭐  on [GitHub](https://github.com/spierala/mini-rx-store)

