import React from 'react';
import AnimatedTiming from '../items/AnimatedTiming';
import AnimationDecay from '../items/AnimationDecay';
import AnimatedSpring from '../items/AnimatedSpring';
import AnimatedValue from '../items/AnimatedValue';
import AnimatedValueXY from '../items/AnimatedValueXY';
const DataAnimation = [
  {
    id: 1,
    name: 'react-native-animated-core',
    data: [
      {
        id: 1,
        name: 'Animated.timing()',
        component: <AnimatedTiming />,
      },
      {
        id: 2,
        name: 'Animated.decay()',
        component: <AnimationDecay />,
      },
      {
        id: 3,
        name: 'Animated.spring()',
        component: <AnimatedSpring />,
      },
      {
        id: 4,
        name: 'Animated.Value()',
        component: <AnimatedValue />,
      },
      {
        id: 5,
        name: 'Animated.ValueXY()',
        component: <AnimatedValueXY />,
      },
    ],
  },
  {
    id: 2,
    name: 'react-native-animatable',
    data: [
      {
        id: 1,
        name: '',
      },
      {
        id: 2,
        name: '',
      },
      {
        id: 3,
        name: '',
      },
      {
        id: 4,
        name: '',
      },
    ],
  },
];
export default DataAnimation;
