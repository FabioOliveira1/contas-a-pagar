export default {
  SET_RENEGOCIATION_FORM: (state, value) => {
    state.form.renegociation = value
  },
  SET_FORM_REFERENCE: (state, params) => {
    state.form[params.field] = params.value
  },
  SET_REQUIREDS: (state, value) => {
    state.requireds = value
  },
  SET_RISKS: (state, value) => {
    state.risks = value
  },
  SET_BANKS: (state, value) => {
    state.banks = value
  },
  SET_PAYMENT_WAYS: (state, value) => {
    state.paymentWays = value
  },
  SET_INIT: (state, value) => {
    state.init = value
  },
  SET_AUTH: (state, obj) => {
    state.auth.email = obj.email
    state.auth.name = obj.name
    state.auth.role = obj.role
    state.auth.token = obj.token
  }
}
