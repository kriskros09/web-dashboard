// Example, not recommend to use on production directly without consideration
// Write current State to localStorage after action finish
const persistMiddleware: Middleware = async (context, restMiddlewares) => {
  const state = {
    User: {
      userId: context.Global.State.User.userId,
      proId: context.Global.State.User.proId,
      firmId: context.Global.State.User.firmId,
      firstName: context.Global.State.User.firstName,
      lastName: context.Global.State.User.lastName,
      profilePicture: context.Global.State.User.profilePicture,
      professionalPicture: context.Global.State.User.professionalPicture,
      session: context.Global.State.User.session,
    },
  }
  localStorage.setItem('__USER_MODEL__', JSON.stringify(state))
  await context.next(restMiddlewares)
}

export { persistMiddleware }
