# NodeJS Pokedex

NodeJS Pokedex is a simple readonly REST API for first-generation Pokemon in MongoDB. I've created this little project while learning NodeJS and MongoDB.

## Requirements

- NodeJS installed
- MongoDB installed
- MongoDB Database Tools installed (for dumping data via mongorestore)

## Setup

1. Clone this repository
```shell
git clone https://github.com/ryturiaga-arcanys/nodejs-pokedex
```
2. Install dependencies
```shell
npm install
```
3. Dump MongoDB data
```shell
mongorestore
```
This would create a pokedex database with Pokemon collection inside (with 151 documents)

*Note: All commands should be run at root directory*

## Endpoints

### Get all Pokemon
`http://localhost:3000/`


### Get Pokemon by their National Pokedex number
`http://localhost:3000/1`
*This endpoint will return data for Bulbasaur*

## Pagination

For performance reasons, the response from list endpoint is paginated. If you want to fetch data for a specific page, you can specify the page number in `page` parameter.

E.g. to get data for the second page: `http://localhost:3000/?page=2`

By default, only 10 items would be returned per page. If you want to get more items per page, you can set the desired number in `limit` parameter.

E.g. to get 25 items per page: `http://localhost:3000/?limit=25`

## Sorting

By default, the list endpoint will sort the Pokemon by `id` in ascending order. If you want to sort by other field, you can specify the field in `sort` parameter. Additionaly, the `order` parameter controls the sorting order. By default, sorting by fields other id will use descending order by default.

E.g. to sort Pokemon by name in ascending order: `http://localhost:3000/?sort=name&order=ascending`

Alternatively, instead of `ascending` and `descending`, you can use `1` or `-1` respectively.

The above call can be simplified as: `http://localhost:3000/?sort=name&order=1`

## Filtering

To filter Pokemon, you can use `filter` param using this syntax pattern: `filter[field]=value`.

E.g. to filter only Pyschic type Pokemon: `http://localhost:3000/?filter[type]=Psychic`

You can chain as many filters as you want as long as they're not conflicting.

E.g to filter only Pyshic type Pokemon that are weak to Grass: `http://localhost:3000/?filter[type]=Psychic&filter[weaknesses]=Grass`
