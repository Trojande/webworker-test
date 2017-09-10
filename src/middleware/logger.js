/**
 * Created by trojande on 9/10/17.
 */
const loggerMiddleware = store => next => action => {
  if (!action.status) {
    console.log(`action ${action.type} is dispatching`);
  } else
    if (action.status) {
      console.log(`action ${action.type} is dispatching with status ${action.status}`)
    }
  next(action);
};

export default loggerMiddleware;