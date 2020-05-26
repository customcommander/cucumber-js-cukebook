const { defineStep, defineParameterType } = require('cucumber');

defineStep('I will match just this text', function () {

});

defineStep('I order {int} burritos at £{float} each', function (amount, price) {
  console.log(`${amount} × ${price} = ${amount * price}`);
});

defineStep('the text is {string}', function (str) {
  console.log(str);
});

defineStep('the name is {word}', function (wrd) {
  console.log(wrd);
});

defineStep('I see {int} fox(es)', function (num) {
  console.log(num);
});

defineStep('I have a dog/cat/fish', function () {
  this.owns_pet = true;
});

defineStep('I have {quantity} book(s)', function (amount) {
  console.log(amount);
});

function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

defineParameterType({
  name: 'quantity',
  regexp: /\d+|no|some/,
  transformer: qty => {
    if (qty === 'no') return 0;
    if (qty === 'some') return between(1, 10);
    return qty;
  }
});
