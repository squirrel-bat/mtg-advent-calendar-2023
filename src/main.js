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

function addHighlightHandler(el, id, img) {
  el.addEventListener('click', () => {
    const hightlight = document.createElement('div')
    hightlight.id = 'highlight-' + id
    hightlight.classList.add('highlight')
    hightlight.style.setProperty('transform-origin', getCenterOfElement(img))

    const createGhosts = function* (amount, prefix = '') {
      for (let i = 0; i < amount; i++) {
        const partA = document.createElement('div')
        const partB = document.createElement('div')
        partA.classList.add([prefix, 'part-a'].filter(Boolean).join('-'))
        partB.classList.add([prefix, 'part-b'].filter(Boolean).join('-'))
        const e = document.createElement('div')
        e.classList.add([prefix, 'ghost-' + i].filter(Boolean).join('-'))
        e.append(partA, partB)
        yield e
      }
    }

    const imgWrapper = document.createElement('div')
    imgWrapper.classList.add('img-wrapper')
    imgWrapper.append(img.cloneNode(), ...createGhosts(3, 'inner'))

    hightlight.append(imgWrapper, ...createGhosts(6))
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
}

function handleDoorClick(e) {
  if (e.target.classList.contains('open')) return
  const img = e.target.querySelector('img')
  const id = e.target.id
  if (img.attributes['src'].value === '') {
    if (document.querySelector('dialog') === null) {
      const dialog = document.createElement('dialog')
      dialog.innerHTML = `<p>Wait, it's not day <span class="date">${
        id.split('-')[1]
      }</span> yet!</p><button>Okay...</button>`
      dialog.classList.add('frosted', 'pop-in')
      dialog.show()
      const dialogWrapper = document.createElement('div')
      dialogWrapper.id = 'dialog-wrapper'
      dialog.querySelector('button').addEventListener('click', () => {
        document.querySelector('#dialog-wrapper').remove()
      })
      dialogWrapper.appendChild(dialog)
      document.querySelector('body').appendChild(dialogWrapper)
    }
    return
  }
  e.target.classList.add('open')
  e.target.removeEventListener('click', handleDoorClick)
  setTimeout(() => {
    addHighlightHandler(e.target, id, img)
    e.target.click()
  }, 1300)
}

function makeItSnow(amount = 100) {
  const protoFlake = document.createElement('div')
  protoFlake.classList.add('snowflake')
  protoFlake.textContent = '❅'

  const createFlakes = function* (amount) {
    for (let i = 0; i < amount; i++) {
      const flake = protoFlake.cloneNode(true)
      flake.style.setProperty(
        '--start-x',
        Math.floor(Math.random() * 100).toString() + '%',
      )
      flake.style.setProperty('--speed', Math.random().toString())
      flake.style.setProperty(
        '--drift',
        (Math.random() * (Math.random() > 0.5 ? 1 : -1)).toString(),
      )
      flake.style.setProperty('--opacity', (0.5 + Math.random() / 2).toString())
      flake.style.setProperty('--rotation', Math.random().toString())
      flake.style.setProperty('--scale-mod', (Math.random() / 2).toString())

      yield flake
    }
  }

  const snow = document.createElement('div')
  snow.id = 'snow'
  snow.append(...createFlakes(amount))
  document.querySelector('body').appendChild(snow)
}

window.addEventListener('load', () => {
  document.querySelectorAll('.card').forEach((element) => {
    if (element.classList.contains('open')) {
      addHighlightHandler(element, element.id, element.querySelector('img'))
    } else {
      element.addEventListener('click', handleDoorClick)
    }
  })
  makeItSnow()
  document.querySelector('#toggle-snow').addEventListener('mousedown', () => {
    document.getElementById('snow').classList.toggle('hide')
  })
})
