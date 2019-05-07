import Vue from 'vue'

/**
 * Returns string which appends the data:image/base64 in the beginning
 * @param  {string} str [stringified image]
 * @return {string}    [appended header]
**/
Vue.filter('base64Header', (str, ext = 'png') => {
  if (!str) {
    return ''
  }
  if (str.includes('http') || str.match(/(?=data:).*(base64,)/gm)) {
    return str
  }

  if (ext.match(/(jpg|png)/g)) {
    return `data:image/${ext};base64,${str}`
  }

  if (ext.match(/(mov|mp4|avi)/g)) {
    return `data:video/${ext};base64,${str}`
  }

  if (ext.match(/(pdf)/g)) {
    return `data:application/${ext};base64,${str}`
  }

  if (ext.match(/(doc|docx)/g)) {
    return `data:application/msword;base64,${str}`
  }

  if (ext.match(/(xls|xlsx)/g)) {
    return `data:application/vnd.ms-excel;base64,${str}`
  }

  if (ext.match(/(csv)/g)) {
    return `data:text/${ext};base64,${str}`
  }

  return `data:text/html;base64,${str}`
})
