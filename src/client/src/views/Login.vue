<template>
    <v-container fill-height fluid>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card class="mx-auto" max-width="450">
                    <v-card-title class="justify-center">
                        OUR GREAT APPLICATION
                    </v-card-title>

                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="login" label="Login" />
                            <v-text-field
                                v-model="password"
                                :append-icon="
                                    showPassword ? 'mdi-eye' : 'mdi-eye-off'
                                "
                                :type="showPassword ? 'text' : 'password'"
                                label="Password"
                                @click:append="showPassword = !showPassword"
                            />
                            <v-btn
                                color="primary"
                                block
                                tile
                                @click="onLoginBtnClick"
                                :loading="loading"
                                >Login</v-btn
                            >
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    data: function() {
        return {
            login: '',
            password: '',
            showPassword: false,
            loading: false
        };
    },
    methods: {
        onLoginBtnClick() {
            console.log('login button click');
        },
    },
});
</script>
