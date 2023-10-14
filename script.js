// import { createStore } from 'https://cdn.skypack.dev/redux';

// Tự tạo ra redux
function createStore(reducer) {
    let state = reducer(undefined, {})
    const subcribers = [];
    return {
    getState() {
        return state;
    },
    dispatch(action) {
        state = reducer(state, action);
        subcribers.forEach(subcribe => {
            subcribe();
        })
    },
    subcribe(subcriber) {
        subcribers.push(subcriber);
    }
    }
}

const createState = 0;
function bankReducer(state = createState, action) {
    switch (action.type) {
        case 'deposit':
            return state + action.payload;
        case 'withdraw':
            return state - action.payload;
        default: return 0;
    }
}
let store = window.store = createStore(bankReducer);
console.log(store)

// action
function actionDeposit(payload) {
    return {
        type: "deposit",
        payload
    }
}
function actionWithdraw(payload) {
    return {
        type: "withdraw",
        payload
    }
}

// Handler
const deposit = document.querySelector('.deposit');
const withdraw = document.querySelector('.withdraw');
deposit.onclick = function () {
    store.dispatch(actionDeposit(10))
    render();
}
withdraw.onclick = function () {
    store.dispatch(actionWithdraw(10))
    render();
}
store.subcribe(() => console.log('Sub 1'));
store.subcribe(() => console.log('Sub 2'));
// render
function render() {
    const output = document.querySelector('.output');
    output.innerText = store.getState();
}
render()