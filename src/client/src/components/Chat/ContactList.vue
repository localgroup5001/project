<template>
    <v-list>
        <contact v-for="(model, i) in contactModels" :key="i" />
    </v-list>  
</template>

<script lang="ts">
import Vue from 'vue';
import Contact from './Contact.vue';

export default Vue.extend({
    data: function () {
        return {
            contactModels: [
                {}, 
                {},
                {},
            ]
        }
    },
    components: {
        Contact,
    }
})
</script>
