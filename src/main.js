function handleDoorClick(e) {
  let img = e.target.querySelector('img')
  if (img.attributes['src'].value === '' || e.target.classList.contains('open'))
    return
  let id = e.target.id
  e.target.classList.add('open')
  e.target.removeEventListener('click', handleDoorClick)
  setTimeout(() => {
    e.target.addEventListener('click', () => {
      let hightlight = document.createElement('div')
      hightlight.id = 'highlight-' + id
      hightlight.classList.add('highlight')
      hightlight.style.setProperty(
        'transform-origin',
        img.getBoundingClientRect().left +
          img.width / 2 +
          'px' +
          ' ' +
          (img.getBoundingClientRect().top + img.height / 2) +
          'px',
      )
      hightlight.appendChild(img.cloneNode())
      hightlight.addEventListener('click', () => {
        hightlight.remove()
      })
      document.querySelector('body').appendChild(hightlight)
      hightlight.classList.add('pop-in')
    })
  }, 1000)
}

window.addEventListener('load', () => {
  document.querySelectorAll('.card').forEach((element) => {
    element.addEventListener('click', handleDoorClick)
  })
})
