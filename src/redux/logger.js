/* eslint no-console: 0 */
export default function(store) {
    return next => action => {
        console.group(action.type);
        console.log('dispatching', action);
        let result = next(action);
        console.log('next state', store.getState());
        console.groupEnd(action.type);
        return result;
    };
}
