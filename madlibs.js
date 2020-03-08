import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';
import { madlibs } from './resources/resources.js';
import GameComponent from './components/GameComponent.js';


console.log(`${madlibs.length} madlibs loaded`);
new Vue({
    el: '#app',
    data: {
        madlib: null,
        appClasses: ['p-4', 'd-flex', 'h-100', 'flex-column', 'align-items-center', 'justify-content-start'],
    },
    components: {
        'game-component': GameComponent,
    },
    created () {
        this.useRandomMadlib();
    },
    methods: {
        getRandomMadlibIndex() {
            return Math.floor(Math.random() * madlibs.length);
        },
        getRandomMadlib() {
            return madlibs[this.getRandomMadlibIndex()];
        },
        useRandomMadlib() {
            this.madlib = this.getRandomMadlib();            
        }
    },
});
