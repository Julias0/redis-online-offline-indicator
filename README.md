# How to run this?

Just do `docker-compose up`

Open `http://localhost:3000`

## What if I updated any dependencies inside package.json?

make sure there is no `node_modules` folder inside `api` folder

`docker-compose build --no-cache`
then run
`docker-compose up --force-recreate --no-deps`

# API curl scripts

```sh
curl --location 'http://localhost:3000/heartbeat' \
--header 'Content-Type: application/json' \
--data '{
    "id": "72539917-4f69-4d16-a259-056e0839795f"
}'
```


```sh
curl --location --request POST 'http://localhost:3000/register'
```

# Underlying Architecture
