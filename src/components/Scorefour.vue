<template>
    <div class="scorefour">
        <div class="content">
            <h1 class="title">
                Scorefour
            </h1>
        </div>
        <div class="content">
            <div class="board">
                <Board v-bind:matrix="matrix()" @action-clicked="clickingCell" />
            </div>
        </div>
        <div class="content">
            <div class="status">
                {{ this.muzero.status }}
            </div>
        </div>
        <div class="content">
            <div class="action" v-if="!muzero.gameover">
                <div>
                    Actions:
                </div>
                <div>
                    <span v-for="action in muzero.legalActions" v-bind:key="action">
                        <button @click="muzero.putAction('human', action)">
                            {{action}}
                        </button>
                    </span>
                </div>
                <div>
                    Computer:
                    </div>
                <div>
                    <button @click="muzero.putAction('self')">self</button>
                    <button @click="muzero.putAction('expert')">expert</button>
                    <button @click="muzero.putAction('random')">random</button>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="start" v-if="muzero.gameover">
                <button @click="start()" >start</button>
                
                Seed:
                <input type="number" v-model="seed">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MuZeroHttpService } from '../models/muzero-http-service';
import Board from './Board.vue';

export type cellValue = 0 | 1 | -1;
export class ObservationValue {
    public item: cellValue = 0;
    public legal = false;
    public force1 = 0;
    public force2 = 0;
}

@Component({
    components: {
        Board,
    }
})
export default class Scorefour extends Vue {
    @Prop() private seed!: number;
    private muzero: MuZeroHttpService;

    public constructor() {
        super();
        this.muzero = new MuZeroHttpService(this.seed, 'scorefour');
    }

    private async mounted() {
        await this.muzero.reset();
    }

    private async start() {
        this.muzero = new MuZeroHttpService(this.seed, 'scorefour');
        this.seed = Math.floor(Math.random() * 10000);
        await this.muzero.reset();
    }

    private async clickingCell(x: number, y: number, z: number) {
        alert(`(x,y,z)=(${x},${y},${z})`);
        /*
        const action = y * 3 + x;
        if (!this.muzero.gameover && this.muzero.isLegal(action)) {
            await this.muzero.putAction('human', action)
        }
        */
    }

    private createEmptyBlock<T>(): T[][][] {
        return [[
            Array(4),
            Array(4),
            Array(4),
            Array(4),
        ],[
            Array(4),
            Array(4),
            Array(4),
            Array(4),
        ],[
            Array(4),
            Array(4),
            Array(4),
            Array(4),
        ],[
            Array(4),
            Array(4),
            Array(4),
            Array(4),
        ]];
    }

    private matrix(): ObservationValue[][][] | null {
        if (this.muzero.observation == null) {
            return null;
        } else {
            const arr = this.createEmptyBlock<ObservationValue>();
            const p = (this.muzero.nextPlayer ?? 0) == 0 ? 1 : -1;

            for (let x=0; x<4; x++) {
                for (let y=0; y<4; y++) {
                    for (let z=0; z<4; z++) {
                        arr[x][y][z] = new ObservationValue();

                        const c0 = this.muzero.observation[0][y][x*4 + z];
                        const c1 = this.muzero.observation[1][y][x*4 + z];
                        if (c0 === 1) {
                            arr[x][y][z].item = p;
                        } else if (c1 === 1) {
                            arr[x][y][z].item = -p as cellValue;
                        }

                        const c2 = this.muzero.observation[2][y][x*4 + z];
                        arr[x][y][z].legal = c2 === 1;

                        const c3 = this.muzero.observation[3][y][x*4 + z];
                        const c4 = this.muzero.observation[4][y][x*4 + z];
                        arr[x][y][z].force1 = p === 1 ? c4 : c3;
                        arr[x][y][z].force2 = p === 1 ? c3 : c4;
                    }
                }
            }
            return arr;
        }
    }
}
</script>

<style scoped>
div.scorefour {
    text-align: center;
    display: block;
}
div.content {
    display: block;
}
div.board {
    display: inline-block;
}
div.action, div.status, div.start {
    text-align: left;
    width: 300px;
    display: inline-block;
    border: 2px solid gray;
    padding: 5px;
    margin: 5px;
    border-radius: 10px;
}
button {
    padding: 7px;
    margin: 2px;
    border-radius: 10px;
}
</style>