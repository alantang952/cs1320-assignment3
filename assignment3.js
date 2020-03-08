/* eslint-disable no-undef */
// this is how to create a component that is globally registered
const url = 'http://ec2-54-172-96-100.compute-1.amazonaws.com/feed/random?q=noodle';
let dateComparator = (a, b) => new Date(b.created_at) - new Date(a.created_at);
let searchString = "";

Vue.component('app-title', {
    template: `
        <h1>
            Noodle Tweets: The Sequel
        </h1>
    `,
});

Vue.component('search-bar', {
    methods: {
        updateText(input) {
            searchString = input.target.value;
            app.filterTweets();
        }
    },
    template: `
        <input @input="updateText" placeholder="Search in tweets"/>    
    `,
})

Vue.component('tweet-input', {
    methods: {
        onClick(event){
            app.addTweet(document.getElementById("tweet").value);
        }
        
    },
    template: `
        <div class = "tweetBox">
            <textarea id="tweet" rows="4" cols="50">
            </textarea>
            <input type="submit" value="Tweet!" @click = "onClick">
        </div>
    `,
})

Vue.component('tweet',{ 
    props: {
        'id': Number,
        'username': String,
        'profilepicture': String,
        'screenname': String,
        'date': String,
        'text': String,
    },
    methods: {
        convertDate(){
            return moment(this.date).format('LLL');
        }
    },
    template: `
        <div>
            <div class="tweet" v-if="id == -1" style="background-color: cyan;">
                <div>
                    <img :src = "profilepicture" class = "profilePicture" onerror = "this.src = 'no_photo.png'">
                </div>
                <div class="tweetInfo">
                    <div class="userInfo">
                        <div class="userNameWrapper">
                            <b>{{username}}</b>
                        </div>
                        <div class="userAtWrapper">
                            @{{screenname}}
                        </div>
                        <div class="tweetDate">
                             {{convertDate()}}
                        </div>
                    </div>
                    <div class="tweetTextWrapper">
                        {{text}}
                    </div>
                </div>
            </div>
            <div class="tweet" v-else>
                <div>
                    <img :src = "profilepicture" class = "profilePicture" onerror = "this.src = 'no_photo.png'">
                </div>
                <div class="tweetInfo">
                    <div class="userInfo">
                        <div class="userNameWrapper">
                            <b>{{username}}</b>
                        </div>
                        <div class="userAtWrapper">
                            @{{screenname}}
                        </div>
                        <div class="tweetDate">
                             {{convertDate()}}
                        </div>
                    </div>
                    <div class="tweetTextWrapper">
                        {{text}}
                    </div>
                </div>
            </div>
        </div>

    `,
})

const app = new Vue({
    el: '#app',
    data: {
        appClasses: ['w-100', 'h-100', 'p-5', 'd-flex', 'flex-column', 'align-items-center'],
        allTweets: [],
        dispTweets: [],
        ready: false,
    },
    methods: {
        fetchAndRefresh() {
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((myJson) => {
                    let temp = myJson.statuses;
                    temp.forEach((element) => {
                        if(!this.allTweets.includes(element)){
                            this.allTweets.push(element);
                        }
                    })
                    this.allTweets = (this.allTweets).sort(dateComparator);
                    this.dispTweets = this.allTweets.filter(tweet => tweet.text.toLowerCase().includes(searchString));
                })
                .catch(err => {
                    // error catching
                    console.log(err);
                });
        },
        setMyTweets(tweets) {
            console.log(this.myTweets);
        },
        makeReady(){
            if (this.ready == false){
                return false;
            } else{
                return true;
            }
        },
        addTweet(tweetText){
            const today = new Date();
            tweet = ({
                id: -1,
                user: {
                    name: 'Noodle Man',
                    profile_image_url_https: 'no_photo.png',
                    screen_name: 'noodleman'
                },
                created_at: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+ ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
                profilepicture: 'no_photo.png',
                text: tweetText,
            });
            this.allTweets.push(tweet);
            this.dispTweets.push(tweet);
            app.dispTweets = app.dispTweets.sort(dateComparator);
            app.allTweets = app.allTweets.sort(dateComparator);
            this.forceUpdate();
        },
        filterTweets(){
            this.dispTweets = this.allTweets.filter(tweet => tweet.text.toLowerCase().includes(searchString));
        }
    },
    created() {
        this.fetchAndRefresh();
        this.ready = true;
        let that = this;
        window.onscroll = function(event) {
            if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
                that.fetchAndRefresh();
            }
        }
    },
});