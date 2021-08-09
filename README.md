This project was built with [Expo](https://expo.dev/).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:8000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run react-native android`

Builds the app for android to the `emulator or any device connected`.<br>

### `npm run react-native iOS`

Builds the app for iOS to the `simulator or any device connected`.<br>

The build is minified and the filenames include the hashes.<br>
Your app is ready to be tested!

## Learn More

You can learn more in the [react Native](https://reactnative.dev/).

Technologies Used
* React-Native
* git clone ```https://github.com/ckOfor/coinmetric_mobile.git```

#### Features
● Initially we should see all assets in the asset list, and all metrics in the metric list.
● Each item should be represented by its full name and its ID / ticker symbol.
● At the top of each column, there should be a text box that we can use to search for items.
○ Full name of the asset may be a partial match from the beginning of the name (e.g., “tcoin” does not match, “bitc” matches, “bitcoin” matches)
○ IDs must be matched in entirety to count as a match (e.g., “18c” matches but not “18”)
○ Match must be made case-insensitively (e.g., “BTC” and “btc” give the same result).
● When we click an item in either list, the other list is immediately filtered to show matching
items.
○ When selecting assets, “matching items” in the metric list are those that are supported
by the selected asset.
○ When selecting metrics, “matching items” in the asset list are those that support the
selected metric.
○ Only one item can be selected across both lists (so only one asset or only one metric)
● Keyword filter and filter based on asset/metric selection apply together.
● We should be able to differentiate between selected and deselected items.
● We should be able to click a button to reset both selections and keywords in both lists at once.
● This application is an internal tool and not performance-critical.

Test the routes above on POSTMAN or any other application of choice
Contributing
Fork this repository to your account.
Clone your repository: git clone git@github.com:ckOfor/coinmetric_mobile.git.
Commit your changes: git commit -m "did something".
Push to the remote branch: git push origin new-feature.
Open a pull request.
Licence
ISC

Copyright (c) 2018 Chinedu Ofor
