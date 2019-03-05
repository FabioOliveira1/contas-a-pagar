import Vue from 'vue'

const notify = config => {
  Vue.swal(config)
}

const success = (text, title = 'Sucesso!') => {
  notify({
    text,
    title,
    type: 'success'
  })
}

const error = (text, title = 'Ops!') => {
  notify({
    text,
    title,
    type: 'error'
  })
}

const warning = (text, title = 'Atenção') => {
  notify({
    text,
    title,
    type: 'warning'
  })
}

const info = (text, title = 'Info') => {
  notify({
    text,
    title,
    type: 'info'
  })
}

export default {
  success,
  error,
  warning,
  info
}
