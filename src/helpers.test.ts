import * as H from './helpers';

test('stringToColour should return a hex color', () => {
	const color = H.stringToColour('test');
	expect(color).toEqual('#924436');
});
