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
  SET_INIT: (state, value) => {
    state.init = value
  }
}
