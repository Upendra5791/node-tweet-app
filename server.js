const express = require('express')
const app = express()

const Twitter = require('twitter-lite')

const port = process.env.port || 3000
const user = new Twitter({
    consumer_key: "QOJAa3oEXmbx4xaPxtbegFRME",
    consumer_secret: "g4cMg5JcU5bTh9WAzZCRlcVfHhZUc7BBqVGFvNmuph0J4ih62M",
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
 
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('static'))
app.set('view engine', 'ejs')
app.set('views','static/views')

let client;

(async () => {
    try {
        const response = await user.getBearerToken()
        console.log(`Got the following Bearer token from Twitter: ${response.access_token}`);
        client = new Twitter({
            bearer_token: response.access_token,
        });
    }catch(e) {
        console.log('Error loading bearer token from Twitter')
        console.log(e)
    }
})()


/* app.use('*', (req, res, next) =>{ 
    console.log(req.url)
})
 */
app.get('/', (req, res, next) => {
    res.render('index')
})

app.get('/tweet-list', (req, res, next) => {
    console.log(req.query)
    if (req.query.term === '') {
        res.status(500).render('tweet-list', {
            error: true,
            msg: 'Enter a valid search term'
        })
    } else {
        client.get(`/search/tweets`, {
            q: req.query.term, 
            lang: "en",
            count: 20,
        })
        .then(resp => {
            res.render('tweet-list', {
                error: false,
                tweets: resp.statuses
            })
        })
        .catch(e => {
            res.status(500).render('tweet-list').json({
                'message': 'Oops! Something went wrong. Try after sometime ;) ',
                'error': true
            })
        })
    }
})

app.get('/api/getTweets', (req, res, next) => {
    if (!req.query.term) {
        res.status(404).json({
            msg: `'term' parameter missing! Provide a valid search term.`
        })
    } else {
        client.get(`/search/tweets`, {
            q: "India",
            lang: "en",
            count: 10,
        })
        .then(resp => {
            res.json({
                'message': 'Tweets fetched successfully',
                'tweets': resp,
            })
        })
        .catch(e => {
            res.status(500).json({
                'message': 'Failed fetching tweets',
                'error': e
            })
        })
    }
})


// Wrap the following code in an async function that is called
// immediately so that we can use "await" statements.
/* (async function() {
    try {
        // Retrieve the bearer token from twitter.
        const response = await user.getBearerToken();
        console.log(`Got the following Bearer token from Twitter: ${response.access_token}`);
        
        // Construct our API client with the bearer token.
        const tweetApp = new Twitter({
            bearer_token: response.access_token,
        });

        let tweets = await tweetApp.get(`/search/tweets`, {
            q: "India", // The search term
            lang: "en",        // Let's only get English tweets
            count: 10,        // Limit the results to 100 tweets
        });

        // Loop over all the tweets and print the text
        for (tweet of tweets.statuses) {
            console.dir(tweet.text);
        }
    } catch(e) {
        console.log("There was an error calling the Twitter API.");
        console.dir(e);
    }
})(); */