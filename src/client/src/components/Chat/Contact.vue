<template>
    <v-list-item @click="onContactClick"> 
        <v-list-item-icon>
            <v-icon>face</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
            <v-list-item-title v-text="'contact name'"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>chat_bubble</v-icon>
        </v-list-item-icon>
    </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    methods: {
        onContactClick() {
            console.log('msg');
        }
    }
});
</script>
