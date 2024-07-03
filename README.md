# React Animated Counter

Fork of a lightweight React component for beautifully animated precent value.

## Usage

**Props:**

|     Name         |     Type        |             Description                                                                                                     |     Default    |
|------------------|-----------------|-----------------------------------------------------------------------------------------------------------------------------|----------------|
|   `value`        | `integer`       | The state integer value                                                                                                     | `0`            |
|   `fontSize`     | `string`        | Applied css `font-size`                                                                                                     | `18px`         |
|   `color`        | `string`        | Applied css `color`                                                                                                         | `black`        |
|   `duration`     | `number`        | Animation duration in seconds                                                                                               | `0.7`          |
|`containerStyles` | `CSSProperties` | Styles to apply to the parent element of the main component. Used in same fashion as react `styles`                         | `{}`           |
|`digitStyles`     | `CSSProperties` | Styles to apply to individual digit elements. Used in same fashion as react `styles`                                        | `{}`           |

**Basic Demo:**

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
      <AnimatedCounter value={counterValue} color="white" fontSize="40px" duration={0.8} />
      <div>
        <button onClick={() => handleCounterUpdate(false)}>Decrement</button>
        <button onClick={() => handleCounterUpdate(true)}>Increment</button>
      </div>
    </div>
  );
};
```
