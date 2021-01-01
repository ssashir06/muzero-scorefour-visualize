<template>
    <div class="box">
        <div class="layer" v-for="z in 4" v-bind:key="z">
            Layer: {{z}}
            <div class="board">
                <div class="row" v-for="x in 4" v-bind:key="x">
                    <div class="col" v-for="y in 4" v-bind:key="y" @click="clicked(x-1, y-1, z-1)">
                        <board-cell v-bind:value="valueFor(x-1, y-1, z-1)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BoardCell from './BoardCell.vue';
import { cellValue, ObservationValue } from './Scorefour.vue';

type axis = 0|1|2|3;

@Component({
    components: {
        BoardCell,
    }
})
export default class Board extends Vue {
    // 4x4x4 matrix
    @Prop() private matrix!: ObservationValue[][][] | null;

    private valueFor(x: axis, y: axis, z: axis): ObservationValue | null{
        if (this.matrix == null) {
            return null;
        } else {
            return this.matrix[x][y][z];
        }
    }

    private clicked(x: axis, y: axis, z: axis) {
        this.$emit('action-clicked', x, y, z);
    }
}
</script>

<style scoped>

div.box {
    display: block;
}
div.layer {
    display: inline-block;
}
div.board {
    border: 2px solid black;
    padding: 0;
    margin: 0;
    display: table;
}
div.row {
    display: table-row;
    padding: 0;
    margin: 0;
}
div.col {
    border: 1px solid black;
    display: table-cell;
    vertical-align: middle;
    width: 100px;
    height: 100px;
    padding: 0;
    margin: 0;
    color: black;
    background-color: lightgray;
}

</style>