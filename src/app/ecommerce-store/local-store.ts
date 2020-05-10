export class LocalStore {

    constructor() { }

    setData(localdata) {
        localStorage.setItem('localdata', JSON.stringify(localdata));
    }

    getData() {
        return JSON.parse(localStorage.getItem('localdata'));
    }

    clearStorage() {
        localStorage.clear();
    }
}

