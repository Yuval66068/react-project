
import Entity from './Entity';

export default class UserAuth extends Entity {
    constructor(email, password) {
        super(); // Calls the constructor of the superclass (Entity)
        this.email = email;
        this.password = password;
    }

    // You can add additional methods specific to UserAuth here if needed
}