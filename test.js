// function partial(func, ...argsBound) {
//   return function(...args) {
//     return func.call(this, ...argsBound, ...args)
//   }
// }

// let user = {
//   firstname: 'Jever',
//   say(time, phrase) {
//     console.log(`[${time}] ${this.firstname}: ${phrase}`)
//   }
// }

// user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes())

// user.sayNow('Hello')

function curry(func) {
  return function curried(...args) {
    console.log(args)
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function pass(...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

function sum(a, b, c) {
  return a + b + c
}
let curriedSum = curry(sum)

console.log(curriedSum(1)(2, 3))

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function pass(...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}
