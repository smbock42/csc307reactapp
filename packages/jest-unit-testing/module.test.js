import mut from './module.js';

test('Testing sum -- success', () => {
    const expected = 30;
    const got = mut.sum(12,18);
    expect(got).toBe(expected);
})

test('Testing sum -- failure', () => {
    const expected = 30;
    const got = mut.sum(13,18);
    expect(got).not.toBe(expected);
})

test('Testing div -- success', () => {
    const expected = 2;
    const got = mut.div(4,2);
    expect(got).toBe(expected);
})