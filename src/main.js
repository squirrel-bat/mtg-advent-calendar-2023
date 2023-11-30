function getCenterOfElement(el) {
  return (
    el.getBoundingClientRect().left +
    el.width / 2 +
    'px' +
    ' ' +
    (el.getBoundingClientRect().top + el.height / 2) +
    'px'
  )
}

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
      hightlight.style.setProperty('transform-origin', getCenterOfElement(img))
      hightlight.appendChild(img.cloneNode())
      document.querySelector('body').appendChild(hightlight)
      hightlight.classList.add('pop-in')
      hightlight.addEventListener('click', () => {
        hightlight.classList.remove('pop-in')
        hightlight.classList.add('pop-out')
        hightlight.addEventListener('animationend', () => {
          hightlight.remove()
        })
      })
    })
  }, 1000)
}

window.addEventListener('load', () => {
  document.querySelectorAll('.card').forEach((element) => {
    element.addEventListener('click', handleDoorClick)
  })
})
