import Vue from 'vue'

import moment from 'moment'

Vue.filter('formatDateTime', (value) => {
  if (value) {
    return moment(String(value)).format('D/MM/YYYY, HH:mm:ss ')
  }
  return ''
})
