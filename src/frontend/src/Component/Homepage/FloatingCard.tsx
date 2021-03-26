import React from 'react';
import './floatingCard.css';
import { useSpring, animated, to } from 'react-spring';

const calc = (x: number, y: number) => [
    -(y - window.innerHeight / 2) / 20,
    (x - window.innerWidth / 2) / 20,
    1.1,
];
const trans = (x: number, y: number, s: number) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

// export function FloatingCard(imageSrc: string, className: string) {
export function FloatingCard(a: any) {
    const [props, set] = useSpring(() => ({
        xys: [0, 0, 1],
        config: { mass: 2, tension: 100, friction: 21 },
    }));

    return (
        <animated.div
            className={'customisedCard'}
            onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: props.xys.to(trans) }}
        >
            {a.children}
        </animated.div>
    );
}
