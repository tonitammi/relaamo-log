# Relaamo log-system

## 3rd party documentation

* Firebase Realtime Database: https://firebase.google.com/docs/database/web/start
* Firebase Authentication: https://firebase.google.com/docs/auth/web/start
 
## Get started

### Install dependencies
```
npm install
```

### Start development server
```
npm run dev
```
or (to open the app automatically on broswer)
```
npm run dev -- --open
```

<br />
Expose to network

```
npm run dev -- --host
```

## Build the app

Create production build (target folder ./dist)
```
npm run build
```

## Build and deploy to Firebase Hosting

```
npm run deploy
```

You need to have Firebase CLI to deploy the app (see https://firebase.google.com/docs/cli).



## In case of an emergency

### Situation 1.

You have deployed app to Firebase hosting. After that you found out that there is major bug.

#### Solution
```
npm run rollback
```

This will rollback the previously deployed version to hosting (hopefully working one).

### Other situations

#### Solution 1
```
Ask ChatGPT or check Google
```

#### Solution 2
```
Pray
```

