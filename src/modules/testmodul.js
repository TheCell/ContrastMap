let test = 'testing';

console.log(test);

let myObject = 
{
    myString: "testString",
    myFunc: function ()
    {
        console.log(this.myString);
    }
}

myObject.myFunc();
//let myFunc2 = myObject.myFunc;

let myFunc2 = myObject.myFunc.bind(myObject);
myFunc2();

export default test;