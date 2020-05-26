# Cukebook

*__As__ a developer in test*<br>
*__I__ want to know how to design steps efficiently*<br>
*__So__ that I can focus on more important things*

## Avoid arrow functions

Don't:

```javascript
defineStep('I sign in', () => {
  signIn(this.config.username, this.config.password); // TypeError
});
```

Do:

```javascript
defineStep('I sign in', function () {
  signIn(this.config.username, this.config.password);
});
```

Why?

Cucumber sets the context of a step to the [World][doc-world]. If you use an arrow function that context will be the module implementing the step. Most likely not what you want.



## Prefer Cucumber expressions over regular expressions

In most cases you don't need regular expressions and you may find Cucumber expressions easier to the eyes.

### Exact match

```javascript
defineStep('I will match just this text', function () {
  //...
});
```

```gherkin
When I will match just this text          # match
Then I will match just this text and more # no match!
```

### Matching numbers

```javascript
defineStep('I order {int} burritos at £{float} each', function (amount, price) {
  console.log(`${amount} × ${price} = ${amount * price}`);
});

```

```gherkin
When I order 10 burritos at £4.75 each # amount: 10, price: 4.75
```

### Matching strings and words

```javascript
// Match anything between double quotes or single quotes
// The quotes **are not** part of the match
defineStep('the text is {string}', function (str) {
  console.log(str);
});

// Match a single word without whitespace
defineStep('the name is {word}', function (wrd) {
  console.log(wrd);
});
```

```gherkin
When the text is "John Doe" # str: 'John Doe'
Then the name is generic    # wrd: 'generic'
When the text is ""         # str: '' (an empty string)
Then the name is empty      # wrd: 'empty'
```

### Pluralisation

```javascript
// the text in parenthesis is optional
defineStep('I see {int} fox(es)', function (num) {
  console.log(num);
});
```

```gherkin
When I see 1 fox    # num: 1
When I see 10 foxes # num: 10
```

### Alternative(s)

```javascript
// match any single word separated by a slash
// ⚠️the match is **not** captured!
defineStep('I have a dog/cat/fish', function () {
  this.owns_pet = true;
});
```

```gherkin
Given I have a dog  # match
Given I have a cat  # match
Given I have a fish # match
```

## Grow your vocabulary with custom types



```javascript
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
```

```gherkin
Given I have no book     # amount: 0
Given I have 2 books     # amount: 2
Given I have some books  # amount: (random number between 1 and 10)
```











[package]: https://github.com/cucumber/cucumber-js
[doc-world]: https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/world.md