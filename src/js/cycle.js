let creative = document.querySelector('.creative')
const cycleDuratrion = 10000
const fadeOutDuration = 1000

cycle()

function cycle() {
  requestAnimationFrame(function () {
    animOn()
    setTimeout(function () {
      requestAnimationFrame(function () {
        animOff()
        setTimeout(cycle, fadeOutDuration)
      })
    }, cycleDuratrion + fadeOutDuration)
  })
}

function animOn() {
  creative.classList.remove('anim-off')
  creative.classList.add('anim-on')
}

function animOff() {
  creative.classList.remove('anim-on')
  creative.classList.add('anim-off')
}
