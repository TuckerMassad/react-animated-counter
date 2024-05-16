# React Animated Counter

A lightweight React component for beautifully animated incrementation & decrementation of a state integer value. Inspired by Robinhood's portfolio balance animation. 

![react-animated-counter demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2N4ZG5mcXE1ZWdsZzQ4bnlxdXlvcGcwamQzcWhmNGNvaGNoem14aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6qomEsKHcyf6R1YmBs/source.gif)

Built to support the chart hover tooltip on https://financhle.com - If you'd like to this component live in-action on a 5 year stock chart feel free to take a peek.

## Installation

`npm install react-animated-counter`

## Usage

**Props:**

|     Name         |     Type        |             Description                                                                                                     |     Default    |
|------------------|-----------------|-----------------------------------------------------------------------------------------------------------------------------|----------------|
|   `value`        | `integer`       | The state integer value                                                                                                     | `0`            |
|   `fontSize`     | `string`        | Applied css `font-size`                                                                                                     | `18px`         |
|   `color`        | `string`        | Applied css `color`                                                                                                         | `black`        |
| `incrementColor` | `string`        | Animation color when `value` increases                                                                                      | `#32cd32`      |
| `decrementColor` | `string`        | Animation color when `value` decreases                                                                                      | `#fe6862`      |
|`includeDecimals` | `boolean`       | Includes or removes decimal point values in provided `value` (rounds to nearest hundredth by default)                       | `true`         |
|`decimalPrecision`| `boolean`       | The nth decimal place of precision (ex. `5` will calculate number to the nearest hundred thousandth)                        | `2`            |
|`includeCommas`   | `boolean`       | Adds comma separators to every third digit to the left of the decimal point used in numbers with four or more digits        | `false`        |
|`containerStyles` | `CSSProperties` | Styles to apply to the parent element of the main component. Used in same fashion as react `styles`                         | `{}`           |
|`digitStyles`     | `CSSProperties` | Styles to apply to individual digit elements. Used in same fashion as react `styles`                                        | `{}`           |

**Basic Demo:**

Codesandbox Link: https://codesandbox.io/p/sandbox/clever-water-v5nwwx

```
import React, { useState } from  'react';
import { AnimatedCounter } from  'react-animated-counter';

const App = () => {
  // Integer state
  const [counterValue, setCounterValue] = useState(500);

  // Handle random increment/decrement
  const handleCounterUpdate = (increment) => {
    const delta = (Math.floor(Math.random() * 100) + 1) * 0.99;
    setCounterValue(increment ? counterValue + delta : counterValue - delta);
  };

  return (
    <div>
      <AnimatedCounter value={counterValue} color="white" fontSize="40px" />
      <div>
        <button onClick={() => handleCounterUpdate(false)}>Decrement</button>
        <button onClick={() => handleCounterUpdate(true)}>Increment</button>
      </div>
    </div>
  );
};
```

**Output:**

![react-animated-counter demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzhwbnF0NDU1ZmhsMHRnZnFwdzVycXU5b2MzYnpxZ3ZtZzFhNG0xNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/N3Xsj09Gp9GbrKF86E/giphy.gif)

**With `recharts` Demo:**

Codesandbox Link: https://codesandbox.io/s/suspicious-morning-rx60sm?file=/src/App.js

**Output:**

![react-animated-counter recharts demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXFoaHkzOG5oMG05aTF6dHo0NHRmOGxmdjQ0Zm1xdGdvNWprNDcyOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IJP2ng53lyeF5QXi5T/giphy.gif)
