import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
      }
    }
  },
  icons: {
    iconfont: "md"
  }
});
