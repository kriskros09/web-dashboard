// Example, not recommend to use on production directly without consideration
// Write current State to localStorage after action finish
const persistMiddleware: Middleware = async (context, restMiddlewares) => {
  const state = {
    Locale: {
      language: context.Global.State.Locale.language,
    },
  }
  localStorage.setItem('__LOCALE_MODEL__', JSON.stringify(state))
  await context.next(restMiddlewares)
}

export { persistMiddleware }
