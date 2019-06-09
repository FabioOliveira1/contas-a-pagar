import Vue from 'vue'

/**
 * Returns string on phone number format
 * @param  {string} phone [phone number without format]
 * @return {string}    [phone number with format]
**/
Vue.filter('asPhoneFormat', (phone) => {
  if (!phone) {
    return 'Número inválido'
  }

  if (typeof phone === 'number') {
    phone = phone.toString()
  }

  phone = phone.replace(/[^0-9]/igm, '')

  let aux = phone.match(/^(\d{4})(\d{4})$/) || phone.match(/^(\d{5})(\d{4})$/)

  if (aux) {
    return `${aux[1]}-${aux[2]}`
  }

  aux = phone.match(/^(\d{2})(\d{4})(\d{4})$/) || phone.match(/^(\d{2})(\d{5})(\d{4})$/)

  if (aux) {
    return `(${aux[1]}) ${aux[2]}-${aux[3]}`
  }

  aux = phone.match(/^(\d{2})(\d{2})(\d{4})(\d{4})$/) || phone.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/)

  if (aux) {
    return `+${aux[1]} (${aux[2]}) ${aux[3]}-${aux[4]}`
  }

  return 'Número inválido'
})

/**
 * Returns string on document format (RG, CPF or CNPJ)
 * @param  {string} doc [document without format]
 * @return {string}    [document with format]
**/
Vue.filter('asDocumentFormat', (doc) => {
  if (!doc) {
    return 'Documento inválido'
  }

  if (typeof doc === 'number') {
    doc = doc.toString()
  }

  doc = doc.replace(/[^0-9x]/igm, '').toUpperCase()

  if (!doc) {
    return 'Documento inválido'
  }

  let aux = doc.match(/^(\d{2})(\d{3})(\d{3})(\w{1})$/) || doc.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/)

  if (aux) {
    return `${aux[1]}.${aux[2]}.${aux[3]}-${aux[4]}`
  }

  aux = doc.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/)

  if (aux) {
    return `${aux[1]}.${aux[2]}.${aux[3]}/${aux[4]}-${aux[5]}`
  }

  return 'Documento inválido'
})

Vue.filter('currency', (value) => parseFloat(Math.round(value * 100) / 100).toFixed(2))
