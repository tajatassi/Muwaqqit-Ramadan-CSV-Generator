# Muwaqqit Ramadn CSV Generator
To run this,

1. Run `npm install`
2. fill out latitude, longitude, and timezone fields in `config.json` 
3. Run `npm run build`
4. Run `node dist/src/index.js`

Sample config.json
```json
{
    "lt": "41.878725", // Latitude
    "ln": "-87.635797", // Longitude
    "tz": "America/Chicago", //time zone name according to the TZ database 

    //Advanced Settings
    "diptype": "apparent", //Horizon Dip
    "ea": -15.0, // Isha Angle
    "eh": 211, // elevation of the horizon in metres
    "eo": 211, // elevation of the observer in metres
    "fa": -18.0, // Fajr Angle
    "fea": 1.0, // Fajr/ʿIshāʾ uncertainty in degrees
    "ia": 4.5, // Karāhah angle in degrees,
    "isn": -10.0, // Ishtibāk al‑Nujūm angle in degrees
    "k": 0.155, // refraction coefficient
    "t": 10.0, // temperature at the observer in celsius
    "rsa": 1.0, // Sun rise/set uncertainty in degrees
    "vc": 3.53, // Hilāl sighting model
    "p": 1010.0 // pressure at the observer in mb,
}
```