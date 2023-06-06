## Steps of hosting MERN
### General
    1. Create a cloud URL for mongo db and convert every local URL to cloud URL.
    2. Confirm that whether it is working

### Backend Hosting

    1. Create a separate folder and move all the backend code into it
    2. Push the backend code of the above folder in a github repo
    3. Go to render and connect a web service with the above repo
    4. Check whether the hosted api working or not.

### Frontend hosting 
    
    1. Remove proxy from package.json
    2. Replace all the api's with backend api
    3. After that check whether frontend is working or not
    4. Add _redirects in public folder and add "/*  /index.html  200" into it without quotation
    5. Run the command npm run build inside client folder
    6. Drag and drop build folder in netlify

