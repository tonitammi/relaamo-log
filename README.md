# Relaamo log-system

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
You have to have Firebase CLI installed. Remember to login too.



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

