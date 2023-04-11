# React Animated Counter

A React component for beautifully animated incrementation & decrementation of a state integer value. Inspired by Robinhood's portfolio balance animation. 


# Installation

`npm install react-animated-counter`

## Required dependencies

React Animated Counter's sole dependency is  [framer-motion](https://www.npmjs.com/package/framer-motion), a lightweight animation library.

## Usage

**Props:**

_Note:_  All props are optional and have default values.

|     Name       |Type                           |Description   | Default                      |
|----------------|-------------------------------|-------------|----------------|
| value           |integer            |The state integer value | `0`
|fontSize         |string             |Applied css `font-size`             | `18px`
|color          | string | Applied css `color` | `black`
|incrementColor | string | Animation color when `value` increases | `#32cd32`
|decrementColor | string | Animation color when `value` decreases | `#fe6862`
