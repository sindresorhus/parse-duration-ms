import {test} from 'node:test';
import assert from 'node:assert/strict';
import parseDuration from './index.js';

test('milliseconds', () => {
	assert.equal(parseDuration('100ms'), 100);
	assert.equal(parseDuration('500ms'), 500);
	assert.equal(parseDuration('1ms'), 1);
});

test('seconds', () => {
	assert.equal(parseDuration('1s'), 1000);
	assert.equal(parseDuration('30s'), 30_000);
	assert.equal(parseDuration('60s'), 60_000);
});

test('minutes', () => {
	assert.equal(parseDuration('1m'), 60_000);
	assert.equal(parseDuration('5m'), 300_000);
	assert.equal(parseDuration('30m'), 1_800_000);
});

test('hours', () => {
	assert.equal(parseDuration('1h'), 3_600_000);
	assert.equal(parseDuration('2h'), 7_200_000);
	assert.equal(parseDuration('24h'), 86_400_000);
});

test('days', () => {
	assert.equal(parseDuration('1d'), 86_400_000);
	assert.equal(parseDuration('2d'), 172_800_000);
	assert.equal(parseDuration('7d'), 604_800_000);
});

test('weeks', () => {
	assert.equal(parseDuration('1w'), 604_800_000);
	assert.equal(parseDuration('2w'), 1_209_600_000);
});

test('combined units with spaces', () => {
	assert.equal(parseDuration('1h 30m'), 5_400_000);
	assert.equal(parseDuration('2d 5h'), 190_800_000);
	assert.equal(parseDuration('1h 30m 45s'), 5_445_000);
	assert.equal(parseDuration('2d 5h 30m'), 192_600_000);
	assert.equal(parseDuration('1d 2h 3m 4s'), 93_784_000);
});

test('combined units without spaces', () => {
	assert.equal(parseDuration('1h30m'), 5_400_000);
	assert.equal(parseDuration('2d5h'), 190_800_000);
});

test('decimal values', () => {
	assert.equal(parseDuration('1.5h'), 5_400_000);
	assert.equal(parseDuration('0.5m'), 30_000);
	assert.equal(parseDuration('2.5d'), 216_000_000);
	assert.equal(parseDuration('.5h'), 1_800_000);
});

test('case insensitive', () => {
	assert.equal(parseDuration('1H'), 3_600_000);
	assert.equal(parseDuration('1M'), 60_000);
	assert.equal(parseDuration('1S'), 1000);
	assert.equal(parseDuration('1D'), 86_400_000);
	assert.equal(parseDuration('100MS'), 100);
});

test('negative values', () => {
	assert.equal(parseDuration('-1h'), -3_600_000);
	assert.equal(parseDuration('-30m'), -1_800_000);
	assert.equal(parseDuration('-1d 2h'), -79_200_000);
});

test('zero values', () => {
	assert.equal(parseDuration('0s'), 0);
	assert.equal(parseDuration('0m'), 0);
	assert.equal(parseDuration('0h'), 0);
});

test('whitespace handling', () => {
	assert.equal(parseDuration('  1h  '), 3_600_000);
	assert.equal(parseDuration('1h  30m'), 5_400_000);
	assert.equal(parseDuration('1h   30m'), 5_400_000);
});

test('invalid input returns undefined', () => {
	assert.equal(parseDuration(''), undefined);
	assert.equal(parseDuration('invalid'), undefined);
	assert.equal(parseDuration('123'), undefined);
	assert.equal(parseDuration('h'), undefined);
	assert.equal(parseDuration('1x'), undefined);
	assert.equal(parseDuration('1h 2x'), undefined);
});

test('invalid types throw TypeError', () => {
	assert.throws(() => parseDuration(null), TypeError);
	assert.throws(() => parseDuration(undefined), TypeError);
	assert.throws(() => parseDuration({}), TypeError);
	assert.throws(() => parseDuration([]), TypeError);
	assert.throws(() => parseDuration(true), TypeError);
});

test('edge cases', () => {
	assert.equal(parseDuration('0.1s'), 100);
	assert.equal(parseDuration('0.01h'), 36_000);
	assert.equal(parseDuration('1000ms'), 1000);
});

test('real-world examples', () => {
	assert.equal(parseDuration('90m'), 5_400_000);
	assert.equal(parseDuration('1h 41m'), 6_060_000);
	assert.equal(parseDuration('2h 30m 15s'), 9_015_000);
});

test('long-form units: singular', () => {
	assert.equal(parseDuration('1 millisecond'), 1);
	assert.equal(parseDuration('1 second'), 1000);
	assert.equal(parseDuration('1 minute'), 60_000);
	assert.equal(parseDuration('1 hour'), 3_600_000);
	assert.equal(parseDuration('1 day'), 86_400_000);
	assert.equal(parseDuration('1 week'), 604_800_000);
});

test('long-form units: plural', () => {
	assert.equal(parseDuration('100 milliseconds'), 100);
	assert.equal(parseDuration('30 seconds'), 30_000);
	assert.equal(parseDuration('5 minutes'), 300_000);
	assert.equal(parseDuration('2 hours'), 7_200_000);
	assert.equal(parseDuration('7 days'), 604_800_000);
	assert.equal(parseDuration('2 weeks'), 1_209_600_000);
});

test('long-form units: combined', () => {
	assert.equal(parseDuration('1 hour 30 minutes'), 5_400_000);
	assert.equal(parseDuration('2 days 5 hours 30 minutes'), 192_600_000);
	assert.equal(parseDuration('1 week 2 days'), 777_600_000);
});

test('long-form units: case insensitive', () => {
	assert.equal(parseDuration('1 HOUR'), 3_600_000);
	assert.equal(parseDuration('30 Minutes'), 1_800_000);
	assert.equal(parseDuration('5 SECONDS'), 5000);
});

test('long-form units: with decimals', () => {
	assert.equal(parseDuration('1.5 hours'), 5_400_000);
	assert.equal(parseDuration('2.5 days'), 216_000_000);
	assert.equal(parseDuration('0.5 minutes'), 30_000);
});

test('mixed short and long-form units', () => {
	assert.equal(parseDuration('1h 30 minutes'), 5_400_000);
	assert.equal(parseDuration('2 days 5h'), 190_800_000);
	assert.equal(parseDuration('90 minutes'), 5_400_000);
});

test('edge cases: large values', () => {
	assert.equal(parseDuration('90m'), 5_400_000);
	assert.equal(parseDuration('120s'), 120_000);
	assert.equal(parseDuration('48h'), 172_800_000);
	assert.equal(parseDuration('365d'), 31_536_000_000);
});

test('edge cases: very small values', () => {
	assert.equal(parseDuration('0.001s'), 1);
	assert.equal(parseDuration('0.1ms'), 0.1);
	assert.equal(parseDuration('1ms'), 1);
});

test('edge cases: no space before unit', () => {
	assert.equal(parseDuration('1h'), 3_600_000);
	assert.equal(parseDuration('30m'), 1_800_000);
	assert.equal(parseDuration('1hour'), 3_600_000);
	assert.equal(parseDuration('30minutes'), 1_800_000);
});

test('edge cases: multiple spaces', () => {
	assert.equal(parseDuration('1  hour  30  minutes'), 5_400_000);
	assert.equal(parseDuration('2   days    5    hours'), 190_800_000);
});

test('nanoseconds', () => {
	assert.equal(parseDuration('1ns'), 1e-6);
	assert.equal(parseDuration('1000ns'), 1e-3);
	assert.equal(parseDuration('1 nanosecond'), 1e-6);
	assert.equal(parseDuration('1000 nanoseconds'), 1e-3);
	assert.equal(parseDuration('1nsec'), 1e-6);
	assert.equal(parseDuration('1000nsecs'), 1e-3);
});

test('shortened forms: hours', () => {
	assert.equal(parseDuration('1hr'), 3_600_000);
	assert.equal(parseDuration('2hrs'), 7_200_000);
	assert.equal(parseDuration('1.5hrs'), 5_400_000);
});

test('shortened forms: minutes', () => {
	assert.equal(parseDuration('1min'), 60_000);
	assert.equal(parseDuration('30mins'), 1_800_000);
	assert.equal(parseDuration('90mins'), 5_400_000);
});

test('shortened forms: seconds', () => {
	assert.equal(parseDuration('1sec'), 1000);
	assert.equal(parseDuration('30secs'), 30_000);
	assert.equal(parseDuration('90secs'), 90_000);
});

test('shortened forms: milliseconds', () => {
	assert.equal(parseDuration('1msec'), 1);
	assert.equal(parseDuration('100msecs'), 100);
	assert.equal(parseDuration('1000msecs'), 1000);
});

test('mixed shortened forms', () => {
	assert.equal(parseDuration('1hr 30mins'), 5_400_000);
	assert.equal(parseDuration('2w 3d'), 1_468_800_000);
	assert.equal(parseDuration('1d 2hrs 30mins'), 95_400_000);
});

test('edge cases: leading zeros', () => {
	assert.equal(parseDuration('01h'), 3_600_000);
	assert.equal(parseDuration('00.5h'), 1_800_000);
	assert.equal(parseDuration('001m'), 60_000);
});

test('edge cases: plus sign', () => {
	assert.equal(parseDuration('+1h'), 3_600_000);
	assert.equal(parseDuration('+30m'), 1_800_000);
	assert.equal(parseDuration('+1.5h'), 5_400_000);
});

test('edge cases: same unit repeated', () => {
	assert.equal(parseDuration('1h 2h'), 10_800_000);
	assert.equal(parseDuration('30m 15m 5m'), 3_000_000);
	assert.equal(parseDuration('1d 1d'), 172_800_000);
});

test('edge cases: mixed case in same string', () => {
	assert.equal(parseDuration('1H 30m'), 5_400_000);
	assert.equal(parseDuration('2D 5h'), 190_800_000);
	assert.equal(parseDuration('1HOUR 30MINUTES'), 5_400_000);
});

test('edge cases: tab characters', () => {
	assert.equal(parseDuration('1h\t30m'), 5_400_000);
	assert.equal(parseDuration('2d\t\t5h'), 190_800_000);
});

test('edge cases: newline characters', () => {
	assert.equal(parseDuration('1h\n30m'), 5_400_000);
	assert.equal(parseDuration('2d\n5h\n30m'), 192_600_000);
});

test('edge cases: very precise decimals', () => {
	assert.equal(parseDuration('1.123456789h'), 4_044_444.4404);
	assert.equal(parseDuration('0.00001s'), 0.01);
});

test('edge cases: negative zero', () => {
	assert.equal(parseDuration('-0h'), 0);
	assert.equal(parseDuration('-0m'), 0);
});

test('edge cases: extremely large numbers', () => {
	assert.equal(parseDuration('999999999d'), 86_399_999_913_600_000);
	assert.equal(parseDuration('1000000h'), 3_600_000_000_000);
});

test('edge cases: only whitespace', () => {
	assert.equal(parseDuration('   '), undefined);
	assert.equal(parseDuration('\t\t'), undefined);
	assert.equal(parseDuration('\n\n'), undefined);
});

test('edge cases: unit without value', () => {
	assert.equal(parseDuration('h'), undefined);
	assert.equal(parseDuration('min'), undefined);
	assert.equal(parseDuration('seconds'), undefined);
});

test('edge cases: value without unit', () => {
	assert.equal(parseDuration('123'), undefined);
	assert.equal(parseDuration('45.6'), undefined);
	assert.equal(parseDuration('.5'), undefined);
});

test('edge cases: multiple signs', () => {
	assert.equal(parseDuration('++1h'), undefined);
	assert.equal(parseDuration('--1h'), undefined);
	assert.equal(parseDuration('+-1h'), undefined);
});

test('edge cases: scientific notation', () => {
	assert.equal(parseDuration('1e10s'), undefined);
	assert.equal(parseDuration('1e-5m'), undefined);
	assert.equal(parseDuration('5E3h'), undefined);
});

test('edge cases: invalid characters mixed in', () => {
	assert.equal(parseDuration('1h@30m'), undefined);
	assert.equal(parseDuration('2d#5h'), undefined);
	assert.equal(parseDuration('1h 30m!'), undefined);
});

test('edge cases: trailing/leading invalid units', () => {
	assert.equal(parseDuration('x1h'), undefined);
	assert.equal(parseDuration('1hs'), undefined);
	assert.equal(parseDuration('1hx'), undefined);
});

test('edge cases: partial unit names', () => {
	assert.equal(parseDuration('1hou'), undefined);
	assert.equal(parseDuration('1minu'), undefined);
	assert.equal(parseDuration('1se'), undefined);
});

test('edge cases: multiple dots', () => {
	assert.equal(parseDuration('1.2.3h'), undefined);
	assert.equal(parseDuration('..5m'), undefined);
	assert.equal(parseDuration('5..m'), undefined);
});

test('edge cases: only dot', () => {
	assert.equal(parseDuration('.h'), undefined);
	assert.equal(parseDuration('.m'), undefined);
});

test('ReDoS protection: long digit sequences', () => {
	const longNumber = '1'.repeat(1000);
	const start = Date.now();
	parseDuration(`${longNumber}h`);
	const duration = Date.now() - start;
	assert.ok(duration < 100, `Should complete in <100ms, took ${duration}ms`);
});

test('ReDoS protection: many invalid patterns', () => {
	const manyInvalid = 'x '.repeat(1000);
	const start = Date.now();
	assert.equal(parseDuration(manyInvalid), undefined);
	const duration = Date.now() - start;
	assert.ok(duration < 100, `Should complete in <100ms, took ${duration}ms`);
});

test('ReDoS protection: alternating valid and invalid', () => {
	const alternating = '1h x '.repeat(500);
	const start = Date.now();
	assert.equal(parseDuration(alternating), undefined);
	const duration = Date.now() - start;
	assert.ok(duration < 100, `Should complete in <100ms, took ${duration}ms`);
});

test('ReDoS protection: long string of spaces', () => {
	const manySpaces = ' '.repeat(10_000);
	const start = Date.now();
	assert.equal(parseDuration(manySpaces), undefined);
	const duration = Date.now() - start;
	assert.ok(duration < 100, `Should complete in <100ms, took ${duration}ms`);
});

test('ReDoS protection: many valid tokens', () => {
	const manyValid = '1h '.repeat(1000);
	const start = Date.now();
	const result = parseDuration(manyValid);
	const duration = Date.now() - start;
	assert.equal(result, 3_600_000 * 1000);
	assert.ok(duration < 100, `Should complete in <100ms, took ${duration}ms`);
});

test('ReDoS protection: almost-matching unit names', () => {
	const almostMatches = '1nanos 2millis 3sec 4min'.repeat(100);
	const start = Date.now();
	assert.equal(parseDuration(almostMatches), undefined);
	const duration = Date.now() - start;
	assert.ok(duration < 100, `Should complete in <100ms, took ${duration}ms`);
});

test('ReDoS protection: valid then invalid at end', () => {
	const validThenInvalid = '1h '.repeat(500) + 'invalid';
	const start = Date.now();
	assert.equal(parseDuration(validThenInvalid), undefined);
	const duration = Date.now() - start;
	assert.ok(duration < 100, `Should complete in <100ms, took ${duration}ms`);
});

test('ReDoS protection: digits with partial unit match', () => {
	const partialUnit = '1234567890hou '.repeat(100);
	const start = Date.now();
	assert.equal(parseDuration(partialUnit), undefined);
	const duration = Date.now() - start;
	assert.ok(duration < 100, `Should complete in <100ms, took ${duration}ms`);
});

test('ReDoS protection: many spaces between tokens', () => {
	let spacedTokens = '';
	for (let index = 0; index < 100; index++) {
		spacedTokens += `${index}h` + ' '.repeat(50);
	}

	const start = Date.now();
	parseDuration(spacedTokens);
	const duration = Date.now() - start;
	assert.ok(duration < 100, `Should complete in <100ms, took ${duration}ms`);
});
