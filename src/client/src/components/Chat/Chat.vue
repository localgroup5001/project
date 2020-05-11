<template>
    <v-row>
        <v-col :cols="2">
            <ContactList></ContactList>   
        </v-col>
        <v-col :cols="10">
            Chat window 
        </v-col>
    </v-row> 
</template>

<script lang="ts">
import Vue from 'vue';
import ContactList from './ContactList.vue';

export default Vue.extend({
    components: {
        ContactList,
    }
})
</script>