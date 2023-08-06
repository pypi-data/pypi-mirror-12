myyql
---
YQL(Yahoo Query Language) client written in python3

## How do we get set up?
```sh
pip install myyql
```

## Usage
```python3
import myyql.request
myyql.request.send(query='select * from yahoo.finance.historicaldata where symbol in ("EUR=X") and startDate = "2014-01-01" and endDate = "2014-12-31"', fmt='json')
```

## Home
[Github](https://github.com/chikyukotei/myyql)

## TO DO
This is alpha

## YQL info

### tables

* yahoo.finance.xchange
* yahoo.finance.historicaldata


