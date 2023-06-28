# React Animated Counter

A lightweight React component for beautifully animated incrementation & decrementation of a state integer value. Inspired by Robinhood's portfolio balance animation. 

![react-animated-counter demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTBmNDRiNmEzNThmOWVlODg4NzVhZDA2ZjY0OTJiZmZlMDg2ZTZkOSZjdD1n/NrKPwl0quI0OtavaBR/giphy.gif)

## Installation

`npm install react-animated-counter`

## Required dependencies

React Animated Counter's sole dependency is  [framer-motion](https://www.npmjs.com/package/framer-motion), a lightweight animation library.

## Usage

**Props:**

|     Name       |     Type      |             Description                                                                     |     Default    |
|----------------|---------------|---------------------------------------------------------------------------------------------|----------------|
|   `value`       | `integer`    | The state integer value                                                                     | `0`            |
|   `fontSize`    | `string`     | Applied css `font-size`                                                                     | `18px`         |
|   `color`       | `string`     | Applied css `color`                                                                         | `black`        |
| `incrementColor`| `string`     | Animation color when `value` increases                                                      | `#32cd32`      |
| `decrementColor`| `string`     | Animation color when `value` decreases                                                      | `#fe6862`      |
|`includeDecimals`| `boolean`    | Includes or removes decimal point values in provided `value` (rounds to nearest hundredth)  | `true`         |

**Basic Demo:**
```
import React, { useState } from  'react';
import { AnimatedCounter } from  'react-animated-counter';

const App = () => {

  // When counterValue increases, increment animation triggers.
  // When counterValue decreases, decrement animation triggers.
  const [counterValue, setCounterValue] = useState(500);

  return (
    <AnimatedCounter
      value={counterValue}
      color='white'
      fontSize='40px'
    />
  );
}
```

**Output:**

<img src="https://i.ibb.co/pKk5VjH/Screen-Shot-2023-04-16-at-7-00-31-PM.png" alt="React Animated Counter Demo Output" border="0" />

**With `recharts` Demo:**

Codesandbox Link: https://codesandbox.io/s/suspicious-morning-rx60sm?file=/src/App.js:0-1767 

**Output:**

![react-animated-counter recharts demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWI0ZDVhZTA5ZGRhMmE2ZDhiN2I1NjM1NjgwMmViY2MzMjhmNGRmNyZjdD1n/jlXS4wmfB0BnJSMDdx/giphy.gif)
