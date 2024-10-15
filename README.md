

## quick start

```bash
npm install yuumi-share --save
```

```ts
import { useShare, useDate } from 'yuumi-share'

const { getValueByPath } = useShare()
const { dateFormatter } = useDate()

console.log(dateFormatter(new Date())) // today is 2024-10-15 13:24:34
```
