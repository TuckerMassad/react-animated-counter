# React Animated Counter

A React component for beautifully animated incrementation & decrementation of a state integer value. Inspired by Robinhood's portfolio balance animation. 

![react-animated-counter demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmFhMjhlMWMxMmQ5NTJjYzIxMDM1YmRlOGQxNThmY2IwN2ViNGQ2MiZjdD1n/sp2UPcCj875Q52CQSq/giphy.gif)

## Installation

`npm install react-animated-counter`

## Required dependencies

React Animated Counter's sole dependency is  [framer-motion](https://www.npmjs.com/package/framer-motion), a lightweight animation library.

## Usage

**Props:**

_Note:_  All props are optional and have default values.

|     Name       |     Type      |             Description                |     Default    |
|----------------|---------------|----------------------------------------|----------------|
|    value       | integer       | The state integer value                | `0`            |
|    fontSize    | string        | Applied css `font-size`                | `18px`         |
|    color       | string        | Applied css `color`                    | `black`        |
| incrementColor | string        | Animation color when `value` increases | `#32cd32`      |
| decrementColor | string        | Animation color when `value` decreases | `#fe6862`      |

## Basic Usage
```
import React, { useState } from  "react";
import { AnimatedCounter } from  'react-animated-counter';

const App = () => {

  // When counterValue increases, increment animation triggers.
  // When counterValue decreases, decrement animation triggers.
  const [counterValue, setCounterValue] = useState(500);

  return (
    <AnimatedCounter
      value={counterValue}
      color="white'
      fontSize="40px"
    />
  );
}
```

#### Output

<img src="https://i.ibb.co/VMnjVDc/Screen-Shot-2023-04-11-at-9-30-23-PM.png" alt="React Animated Counter Demo Output" border="0" />
