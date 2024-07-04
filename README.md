# React Animated Percent

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
import { AnimatedPercent } from  'react-animated-percent';

const App = () => {
  // Integer state
  const [value, setValue] = useState(500);

  // Handle random increment/decrement
  const handleUpdate = (increment) => {
    const delta = (Math.floor(Math.random() * 100) + 1) * 0.99;
    setValue(increment ? value + delta : value - delta);
  };

  return (
    <div>
      <AnimatedPercent value={value} color="white" fontSize="40px" duration={0.8} />
      <div>
        <button onClick={() => handleUpdate(false)}>Decrement</button>
        <button onClick={() => handleUpdate(true)}>Increment</button>
      </div>
    </div>
  );
};
```
