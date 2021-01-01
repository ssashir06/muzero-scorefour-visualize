<template>
    <div class="board-cell">
        <p v-if="value == null || value.item===0">&nbsp;</p>
        <p v-if="value != null && value.item<0" class="item player-1">&#x25cd;</p>
        <p v-if="value != null && value.item>0" class="item player-2">&#x25cd;</p>
        <p v-if="value != null && value.legal">&#x25cc;</p>
        <div v-if="value != null" v-bind:style="{width: value.force1*100+'px'}" class="force player-1"></div>
        <div v-if="value != null" v-bind:style="{width: value.force2*100+'px'}" class="force player-2"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { cellValue, ObservationValue } from './Scorefour.vue';

@Component
export default class BoardCell extends Vue {
    @Prop() private value!: ObservationValue;
}
</script>

<style scoped>
div.board-cell {
    text-align: center;
    font-size: 20pt;
}
p.item.player-1 {
    color: green;
}
p.item.player-2 {
    color: blue;
}
div.force {
    height: 1px;
}
div.force.player-1 {
    border: 1px solid green;
    background: green;
}
div.force.player-2 {
    border: 1px solid blue;
    background: blue;
}
</style>