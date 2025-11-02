/**
Parse a duration string to milliseconds.

@param input - The duration string to parse (e.g., `'1h'`, `'90m'`, `'2 days 5 hours'`).
@returns The duration in milliseconds, or `undefined` if the input is invalid.
@throws {TypeError} If input is not a string.

Supported units:
- Nanoseconds: `ns`, `nsec`, `nsecs`, `nanosecond`, `nanoseconds`
- Milliseconds: `ms`, `msec`, `msecs`, `millisecond`, `milliseconds`
- Seconds: `s`, `sec`, `secs`, `second`, `seconds`
- Minutes: `m`, `min`, `mins`, `minute`, `minutes`
- Hours: `h`, `hr`, `hrs`, `hour`, `hours`
- Days: `d`, `day`, `days`
- Weeks: `w`, `week`, `weeks`

@example
```
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

parseDuration('invalid');
//=> undefined
```
*/
export default function parseDuration(input: string): number | undefined;
