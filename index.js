const unitDefinitions = [
	{milliseconds: 1e-6, names: ['nanoseconds', 'nanosecond', 'nsecs', 'nsec', 'ns']},
	{milliseconds: 1, names: ['milliseconds', 'millisecond', 'msecs', 'msec', 'ms']},
	{milliseconds: 1000, names: ['seconds', 'second', 'secs', 'sec', 's']},
	{milliseconds: 60_000, names: ['minutes', 'minute', 'mins', 'min', 'm']},
	{milliseconds: 3_600_000, names: ['hours', 'hour', 'hrs', 'hr', 'h']},
	{milliseconds: 86_400_000, names: ['days', 'day', 'd']},
	{milliseconds: 604_800_000, names: ['weeks', 'week', 'w']},
];

const unitToMilliseconds = {};
for (const {milliseconds, names} of unitDefinitions) {
	for (const name of names) {
		unitToMilliseconds[name] = milliseconds;
	}
}

const unitNames = Object.keys(unitToMilliseconds).sort((a, b) => b.length - a.length);
const unitPattern = unitNames.join('|');
const valuePattern = String.raw`[+-]?(?:\d+\.\d+|\d+|\.\d+)`;

const validationPattern = new RegExp(String.raw`^\s*(?:${valuePattern}\s*(?:${unitPattern})\s*)+$`);
const extractionPattern = new RegExp(String.raw`(?<value>${valuePattern})\s*(?<unit>${unitPattern})`, 'g');

export default function parseDuration(input) {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got \`${typeof input}\``);
	}

	const normalizedInput = input.trim().toLowerCase();

	if (!normalizedInput || !validationPattern.test(normalizedInput)) {
		return undefined;
	}

	let totalMilliseconds = 0;

	for (const match of normalizedInput.matchAll(extractionPattern)) {
		const {value, unit} = match.groups;
		const numericValue = Number.parseFloat(value);

		if (!Number.isFinite(numericValue)) {
			return undefined;
		}

		totalMilliseconds += numericValue * unitToMilliseconds[unit];
	}

	return totalMilliseconds;
}
