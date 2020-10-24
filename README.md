# Bookn Is Awesome

Bookn Is Awesome is a terminal project for the Bookn job application.

## Instructions

Checkout this repo and use npm install for node_modules sync.

After this, just call

```javascript
node bookn_me.js
```

to see the simple magic. Using that way, the app uses the default configuration. If you would like to change, just create a .json file with name, period - _IMPORTANT: period should be in minutes format_ - and workingHours (you can see examples in the "assets" folder) and pass the path as a argument, as below:

```javascript
node bookn_me.js input=/full/path/to/config/file.json
```

The JSON config should like more or less like this:

```javascript
{ "name": "Name of my bussiness",
"period": "30",
"workingHours": { "start": "17:00", "end": "23:00" },
"existingServices": [{ "start": "18:00", "end": "19:00" }]
//The 'existingServices' is optional
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
