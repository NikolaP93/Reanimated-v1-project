import React from 'react'
import { View, Dimensions } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, {
    Value,
} from 'react-native-reanimated'
import Card from './Card'
import { clamp, onGestureEvent } from "react-native-redash/lib/module/v1";
import { withSpring } from '../helpers/animationHelpers'

const { height } = Dimensions.get('window')
const snapY = height / 1.75;
const offsetY = new Value(snapY)
const Spring = () => {

    const state = new Value(State.UNDETERMINED);
    const translationY = new Value(0);
    const velocityY = new Value(0);
    const gestureHandler = onGestureEvent({
        state,
        translationY,
        velocityY,
    });
    const translateY = clamp(
        withSpring({
            value: translationY,
            velocity: velocityY,
            state,
            offset: offsetY,
            snapPoints: [height / 2, height / 1.5],
        }),
        height / 3,
        height / 1.2
    )
    return (
        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <PanGestureHandler {...gestureHandler}>
                <Animated.View style={{ alignItems: 'center', transform: [{ translateY }] }}>
                    <Card />
                </Animated.View>
            </PanGestureHandler>
        </View>

    )
}

export default Spring
