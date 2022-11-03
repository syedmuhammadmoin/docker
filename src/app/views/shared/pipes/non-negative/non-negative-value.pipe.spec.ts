import { NonNegativeValuePipe } from './non-negative-value.pipe';

describe('NonNegativeValuePipe', () => {
  it('create an instance', () => {
    const pipe = new NonNegativeValuePipe();
    expect(pipe).toBeTruthy();
  });
});
