import { get_face } from './show_choice.js'

var $die_1 = $('#die-1'),
    $die_2 = $('#die-2'),
    sides = 20,
    initialSide = 1,
    face_1,
    face_2,
    timeoutId,
    transitionDuration = 100, 
    animationDuration  = 1000,
    mode = "Default"

export const get_mode = (next_mode) => {
    mode = next_mode
}

$('ul > li > a').click(function () {
  reset()
  rollTo($(this).attr('href'))
  
})

function chooseFace(face_1, face_2, mode) {
  if (mode === "Default"){
    return face_1
  }else if(mode === "Advantage"){
    return (face_1 <= face_2) ? face_1 : face_2
  }else{
    return (face_1 > face_2) ? face_1 : face_2
  }
}

function randomFace(face) {
  var newFace = Math.floor((Math.random() * sides)) + initialSide
  face = newFace == face ? randomFace(face) : newFace
  return face;
}

function rollTo() {
  clearTimeout(timeoutId)
  
  $('ul > li > a').removeClass('active')
  $('[href=' + face_1 + ']').addClass('active')
  $('[href=' + face_2 + ']').addClass('active')
  
  $die_1.attr('data-face', face_1)
  $die_2.attr('data-face', face_2)
}

function reset() {
  $die_1.attr('data-face', null).removeClass('rolling')
  $die_2.attr('data-face', null).removeClass('rolling')
}

$('.randomize, .die').click(function () {
  $die_1.addClass('rolling')
  $die_2.addClass('rolling')
  clearTimeout(timeoutId)
  
  timeoutId = setTimeout(function () {
    $die_1.removeClass('rolling')
    $die_2.removeClass('rolling')
    
    face_1 = randomFace(face_1)
    face_2 = randomFace(face_2)
    rollTo()
    
    const face = chooseFace(face_1, face_2, mode)

    get_face(face)
  }, animationDuration)
  
  return false
})

