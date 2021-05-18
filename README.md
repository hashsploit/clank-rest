# Clank REST API

This repository creates a REST API web server for [Clank](https://github.com/hashsploit/clank).

All applicable endpoints follow the CRUD model and can be used to expose the Clank MLS RPC service in a safer way.

Copy the configuration file `config.json.example` to `config.json`.

## Endpoints
| Endpoint           | Method | Description                                               |
|--------------------|--------|-----------------------------------------------------------|
| /                  | GET    | Get the clank-rest bridge status and version information. |
| /players           | GET    | Get a list of players connected.                          |
| /players           | POST   | Add a player.                                             |
| /players/:id       | GET    | Get information about a specific player by their id.      |
| /players/:id       | PUT    | Update information about a specific player by their id.   |
| /players/:id       | DELETE | Delete a player by id.                                    |
| /worlds            | GET    | Get a list of worlds.                                     |
| /worlds            | POST   | Add a world.                                              |
| /worlds/:id        | GET    | Get information about a specific world by its id.         |
| /worlds/:id        | PUT    | Update information about a specific world by its id.      |
| /worlds/:id        | DELETE | Delete a world by its id.                                 |
| /channels          | GET    | Get a list of all channels.                               |
| /channels          | POST   | Add a channel.                                            |
| /channels/:id      | GET    | Get information about a specific channel by its id.       |
| /channels/:id      | PUT    | Update information about a specific channel by id.        |
| /channels/:id      | DELETE | Delete a channel by its id.                               |
| /locations         | GET    | Get a list of all locations.                              |
| /locations         | POST   | Add a location.                                           |
| /locations/:id     | GET    | Get information about a specific location by its id.      |
| /locations/:id     | PUT    | Update information about a specific location by id.       |
| /locations/:id     | DELETE | Delete a location by its id.                              |
| /clans             | GET    | Get a list of all clans.                                  |
| /clans             | POST   | Add a clan.                                               |
| /clans/:id         | GET    | Get information about a specific clan by its id.          |
| /clans/:id         | PUT    | Update information about a specific clan by id.           |
| /clans/:id         | DELETE | Delete a clan by its id.                                  |


## Query Parameters

#### GET (any)
- `max_results` [*integer*] A number 0-1000 specifying how many results to return at most, by default is 1000.
- `page` [*integer*] A number 0-n specifying the result "page" to return, by default this is 0.

#### GET /players
- `created_before` [*string*] A UNIX timestamp of the oldest that an account should have been created, all accounts created before this time will be shown.
- `created_after` [*string*] A UNIX timestamp of the newest that an account should have been created, all accounts created after this time will be shown.
