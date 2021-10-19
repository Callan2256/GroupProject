//Model - operations

const model = {
    users: [],
    items: [],

    addUser(user) {
        this.users.push(user);
    },
    addItem(item) {
        this.items.push(item);
    },
};