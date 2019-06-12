export default {
  getRenegociationForm: ({ form }) => form.renegociation,
  getFormReference: ({ form }) => key => form[key]
}
