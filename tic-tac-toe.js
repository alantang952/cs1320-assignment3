/* eslint-disable no-undef */
// this is how to create a component that is globally registered
Vue.component('game-title', {
    template: `
        <h1>
            <a href="https://en.wikipedia.org/wiki/Tic-tac-toe">Tic Tac Toe</a>
        </h1>
    `,
});

Vue.component('welcome-message', {
    props: {
        'message': String,
        'playerNames': {
            type: Array,
            default: () => [],
        }
    },
    computed: {
        // a computed getter
        messageToPlayers() {
            // `this` points to the vm instance
            if (this.playerNames.length) {
                return `${this.message} ${this.playerNames.join(', ')}`;   
            } else {
                return this.message;
            }
        }
    },
    template: `
        <p>
          {{ messageToPlayers }}
        </p>
    `,
});

Vue.component('ready-checkbox', {
    props: {
        'name': String,
        'symbol': String,
    },
    data: function() {
        const id = `ready-switch-for-${this.name}`;
        return {
            checked: false,  
            id,
        };
    },
    methods: {
        onClick(event) {
            this.checked = event.target.checked;
            this.$emit('player-ready', this.name, this.checked);
        }
    },
    template: `
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" :id="id" :checked="checked" @click="onClick">
            <label class="custom-control-label" :for="id">{{name}}, are you ready? Your symbol is {{symbol}}.</label>
        </div>
    `,
});

Vue.component('game-board', {
    props: {
        'turnTracker': Number,
        'cellValues': Array,
    },
    data: function() {
        return {
            classObject: ['container', 'm-auto', 'bg-light', 'd-flex', 'flex-column'],
            styleObject: { 
                'width': '900px', 
                'height': '900px' 
            },
            boardRowClasses: ['board-row', 'row', 'flex-grow-1'],
            boardCellClasses: ['board-cell', 'col', 'p-4', 'border', 'border-primary', 'rounded-lg', 'd-flex'],
            turnCounter: this.turnTracker,
            symbols: ['X', 'O'],
            marked: [[false, false, false], [false, false, false], [false, false, false]],
            winner: false,
        };
    },
    methods: {
        boardRowKey(r) {
            return `row-${r}`;
        },
        boardCellKey(r, c) {
            return `cell-${r}-${c}`;
        },
        registerMove(r, c){
            if(!this.marked[r-1][c-1] && !this.winner){
                this.cellValues[r - 1][c - 1] = this.turnCounter;
                this.marked[r-1][c-1] = true;
                this.turnCounter = (this.turnCounter + 1)%2;
                this.$forceUpdate();
                this.checkWinner((this.turnCounter + 1) % 2);
            }
        },
        checkWinner(playerNum){
            // console.log(this.symbols[playerNum]);
            winCond = this.symbols[playerNum] + this.symbols[playerNum] + this.symbols[playerNum];
            // console.log(winCond);
            let a = this.symbols[this.cellValues[0][0]] + this.symbols[this.cellValues[0][1]] + this.symbols[this.cellValues[0][2]];
            let b = this.symbols[this.cellValues[1][0]] + this.symbols[this.cellValues[1][1]] + this.symbols[this.cellValues[1][2]];
            let c = this.symbols[this.cellValues[2][0]] + this.symbols[this.cellValues[2][1]] + this.symbols[this.cellValues[2][2]];
            let d = this.symbols[this.cellValues[0][0]] + this.symbols[this.cellValues[1][0]] + this.symbols[this.cellValues[2][0]];
            let e = this.symbols[this.cellValues[0][1]] + this.symbols[this.cellValues[1][1]] + this.symbols[this.cellValues[2][1]];
            let f = this.symbols[this.cellValues[0][2]] + this.symbols[this.cellValues[2][1]] + this.symbols[this.cellValues[2][2]];
            let g = this.symbols[this.cellValues[0][0]] + this.symbols[this.cellValues[1][1]] + this.symbols[this.cellValues[2][2]];
            let h = this.symbols[this.cellValues[0][2]] + this.symbols[this.cellValues[1][1]] + this.symbols[this.cellValues[2][0]];
            console.log(a);
            console.log(b);
            console.log(c);
            console.log(d);
            console.log(e);
            console.log(f);
            console.log(a);
            console.log(a);
            if(a === winCond || b === winCond || c === winCond || d === winCond || e === winCond || f === winCond || g === winCond || h === winCond){
                this.winner = true;
                window.alert(app.playerNames[playerNum] + " wins the game!");
            }
        }   
    },
    template: `
        <div id="board" :class="classObject" :style="styleObject">
            <div v-for="r of 3" :key="boardRowKey(r)" :class="boardRowClasses">
                <div
                    v-for="c of 3"
                    :key="boardCellKey(r, c)"
                    :id="(r - 1) * 3 + c"
                    :class="[{'bg-white': [2, 4, 6, 8].includes((r - 1) * 3 + c)}, boardCellClasses]"
                    @click="registerMove(r, c)">
                    <div v-if="cellValues[r-1][c-1] == 0">
                        <img src="x.png" alt="X icon" class="img-responsive" width="100%">
                    </div>
                    <div v-if="cellValues[r-1][c-1] == 1" >
                        <img src="o.png" alt="O icon" class="img-responsive" width="100%"> 
                    </div>
                </div>
                
            </div>
        </div>
    `,
});


const app = new Vue({
    el: '#app',
    data: {
        message: 'Welcome to the game!',
        playerNames: [],
        appClasses: ['w-100', 'h-100', 'p-5', 'd-flex', 'flex-column', 'align-items-center'],
        playerReady: {},
        cellValues: [[2, 2, 2], [2, 2, 2], [2, 2, 2]],
    },
    methods: {
        onPlayerReady(playerName, isReady) {
            this.$set(this.playerReady, playerName, isReady);
        }
    },
    computed: {
        bothPlayerReady() {
            return this.playerNames.length && 
                this.playerNames.map(playerName => this.playerReady[playerName]).reduce((prevValue, currValue) => prevValue && currValue);
        }
    }
});
                

window.setTimeout(() => {
    app.message = 'Ready to get started?';
    app.playerNames.push('Alice', 'Bob');
}, 1000);