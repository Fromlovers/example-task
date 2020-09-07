// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
export function backOut(amount: number): (t: number) => number {
    return (t: number) => --t * t * ((amount + 1) * t + amount) + 1;
}

// Basic lerp funtion.
export function lerp(a1: number, a2: number, t: number): number {
    return a1 * (1 - t) + a2 * t;
}
