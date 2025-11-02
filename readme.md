# parse-duration-ms

> Parse duration strings to milliseconds

Useful for parsing timeout values, cache TTLs, rate limits, and other duration-based configuration in a human-friendly format.

See [`pretty-ms`](https://github.com/sindresorhus/pretty-ms) for the inverse.

## Install

```sh
npm install parse-duration-ms
```

## Usage

```js
import parseDuration from 'parse-duration-ms';

parseDuration('1h');
//=> 3600000

parseDuration('90m');
//=> 5400000

parseDuration('2 days 5 hours 30 minutes');
//=> 192600000

parseDuration('1hr 30min');
//=> 5400000

parseDuration('500ms');
//=> 500

parseDuration('1.5 hours');
//=> 5400000

parseDuration('1h41m');
//=> 6060000

parseDuration('invalid');
//=> undefined
```

## API

### parseDuration(input)

Parses a duration string to milliseconds.

Returns `undefined` if the input is invalid.

Throws a `TypeError` if the input is not a string.

#### input

Type: `string`

The duration string to parse.

**Features:**

- Multiple units: `'1h 30m'`, `'2d 5h 30m'`, `'1 hour 30 minutes'`
- Shortened forms: `'1hr 30min'`, `'90mins'`, `'2w 3d'`
- Decimal values: `'1.5h'`, `'0.5m'`, `'1.5 hours'`
- With or without spaces: `'1h30m'`, `'1h 30m'`, `'1hour'`, `'1 hour'`
- Case insensitive: `'1H'`, `'30M'`, `'1 HOUR'`
- Negative values: `'-1h'`, `'-30m'`

**Supported units:**

| Unit | Short | Shorter | Long (singular) | Long (plural) |
|------|-------|---------|-----------------|---------------|
| Nanoseconds | `ns` | `nsec`, `nsecs` | `nanosecond` | `nanoseconds` |
| Milliseconds | `ms` | `msec`, `msecs` | `millisecond` | `milliseconds` |
| Seconds | `s` | `sec`, `secs` | `second` | `seconds` |
| Minutes | `m` | `min`, `mins` | `minute` | `minutes` |
| Hours | `h` | `hr`, `hrs` | `hour` | `hours` |
| Days | `d` | - | `day` | `days` |
| Weeks | `w` | - | `week` | `weeks` |

## FAQ

### Why no months/years?

Months and years aren't fixed durations. They vary (28-31 days for months, 365-366 for years). Any approximation would be silently wrong in many cases. Be explicit instead: use `'30d'` for ~1 month or `'365d'` for ~1 year.

### What's the difference from `ms`?

This package parses combined units like `'1h 30m'` and `'2 days 5 hours'`. The [`ms`](https://github.com/vercel/ms) package does bidirectional conversion but doesn't support combined units.

### Localization support?

No. This keeps the package simple and small.

### Dates, timestamps, or time zones?

No. This only parses relative durations (lengths of time), not absolute times.

## Related

- [pretty-ms](https://github.com/sindresorhus/pretty-ms) - Convert milliseconds to a human readable string
- [to-milliseconds](https://github.com/sindresorhus/to-milliseconds) - Convert an object of time properties to milliseconds
- [parse-ms](https://github.com/sindresorhus/parse-ms) - Parse milliseconds into an object
