<template>
    <div id="app">
        <scorefour v-bind:seed="Math.floor(Math.random() * 10000)" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Scorefour from './components/Scorefour.vue';

@Component({
    components: {
        Scorefour,
    },
})
export default class App extends Vue {}
</script>

<style>

#app {
    font-family: cursive;
}

</style>
