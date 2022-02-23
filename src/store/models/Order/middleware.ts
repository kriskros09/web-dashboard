// Example, not recommend to use on production directly without consideration
// Write current State to localStorage after action finish
const persistMiddleware: Middleware = async (context, restMiddlewares) => {
  const state = {
    Order: {
      order_details: context.Global.State.Order.order_details,
      order_details_by_codes: context.Global.State.Order.order_details_by_codes,
      mandId: context.Global.State.Order.mandId,
      taskId: context.Global.State.Order.taskId,
    },
  }
  localStorage.setItem('__ORDER_MODEL__', JSON.stringify(state))
  await context.next(restMiddlewares)
}

export { persistMiddleware }
