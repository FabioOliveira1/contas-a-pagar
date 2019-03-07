import Vue from 'vue'

const notify = config => Vue.swal(config)

const success = (text, title = 'Sucesso!') => notify(
  {
    text,
    title,
    type: 'success'
  }
)

const error = (text, title = 'Ops!') => notify(
  {
    text,
    title,
    type: 'error'
  }
)

const warning = (text, title = 'Atenção') => notify(
  {
    text,
    title,
    type: 'warning'
  }
)

const info = (text, title = 'Info') => notify(
  {
    text,
    title,
    type: 'info'
  }
)

const confirm = (text, title = 'Tem certeza?') => notify(
  {
    text,
    title,
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#02649c',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar'
  }
)

export default {
  success,
  error,
  warning,
  info,
  confirm
}
