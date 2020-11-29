import Animated, {
    add, decay as reDecay,
    and,
    neq,
    not,
    startClock,
    block,
    Clock,
    clockRunning,
    cond,
    eq,
    set,
    stopClock,
    Value,
    multiply,
    abs,
    sub,
    min,
    spring as reSpring,
    call,
} from 'react-native-reanimated'
import { State } from 'react-native-gesture-handler'

export const snapPoint = (
    value,
    velocity,
    points
) => {
    const point = add(value, multiply(0.2, velocity));
    const diffPoint = (p) => abs(sub(point, p));
    const deltas = points.map((p) => diffPoint(p));
    const minDelta = min(...deltas);
    return points.reduce(
        (acc, p) => cond(eq(diffPoint(p), minDelta), p, acc),
        new Value()
    );
};

export const withSpring = (props) => {
    const {
        value,
        velocity,
        state,
        snapPoints,
        offset,
        config: springConfig,
        onSnap,
    } = {
        offset: new Value(0),
        ...props,
    };
    const clock = new Clock();
    const springState = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0),
    };

    const config = {
        toValue: new Value(0),
        damping: 25,
        mass: 2,
        stiffness: 120,
        overshootClamping: true,
        restSpeedThreshold: .9,
        restDisplacementThreshold: .9,
        ...springConfig,
    };

    const gestureAndAnimationIsOver = new Value(1);
    // if the animation state began and the clock is running
    const isSpringInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
    // set offset to final pos, stop the clock
    const finishSpring = [
        set(offset, springState.position),
        stopClock(clock),
        set(gestureAndAnimationIsOver, 1),
    ];

    const snap = onSnap
        ? [cond(clockRunning(clock), call([springState.position], onSnap))]
        : [];
    return block([
        // if the animation is interrupted, finish the animation
        cond(isSpringInterrupted, finishSpring),
        // if the gesture and animation are over , then the current pos (final) will be new offset
        cond(gestureAndAnimationIsOver, set(springState.position, offset)),
        // if the animation is not over yet
        cond(neq(state, State.END), [
            // set gesture and animation to false (animation aint over)
            set(gestureAndAnimationIsOver, 0),
            // set the finished prop to false
            set(springState.finished, 0),
            // set current - fina
            set(springState.position, add(offset, value)),
        ]),
        cond(and(eq(state, State.END), not(gestureAndAnimationIsOver)), [
            cond(and(not(clockRunning(clock)), not(springState.finished)), [
                set(springState.velocity, velocity),
                set(springState.time, 0),
                set(
                    config.toValue,
                    snapPoint(springState.position, velocity, snapPoints)
                ),
                startClock(clock),
            ]),
            reSpring(clock, springState, config),
            cond(springState.finished, [...snap, ...finishSpring]),
        ]),
        springState.position,
    ]);
};
