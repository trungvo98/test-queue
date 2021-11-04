function Human(name,age){
    this.name = name,
    this.age = age,
    this.friends = []
}
Human.prototype.sayName = function(){
    console.log(this.name);
}
const person1 = new Human('ASkin',31)
const person2 = new Human("Lone",51);

person1.friends.push('Amit');
console.log(person1.friends);
console.log(person2.friends);
console.log(person1.sayName());
console.log(person2.sayName());