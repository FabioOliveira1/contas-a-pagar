export const getRandomColor = (text = false) => {
  let colors = ['red', 'pink', 'purple ', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey']
  let i = Math.floor(Math.random() * colors.length)

  let darken = Math.ceil(Math.random * 4)

  if (text) {
    return `${colors[i]}--text darken-${darken}`
  }

  return `${colors[i]} darken-${darken}`
}
