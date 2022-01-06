# Nested json to exce

## Endpoit

- Metho POST : http://localhost:3000/export

- Post data : 
```json
{
    "name": "bbs",
    "data": [
        {
            "name": "babakoto",
            "age": "22"
        },
        {
            "name": "rakoto",
            "age": "22"
        }
    ],
    "props": [
        {
            "key": "name"
        },
        {
            "key": "age"
        }
    ]
}
```
- Response :
```json
{
    "url": "http://localhost:3000/bbs_1641485704090_4b8e6e21-b702-457f-ab9b-bbe96cc23284.xlsx",
    "name": "bbs_1641485704090_4b8e6e21-b702-457f-ab9b-bbe96cc23284.xlsx"
}
```

## kick start
```
```bash
node app.js
```

