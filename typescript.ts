class Student {
    fullName: string;
    constructor(public firstName, public lastName) {
        this.fullName = firstName + " " + lastName;
    }
}

function greeter(stud: Student) {
    console.log("Hello " + stud.fullName);
