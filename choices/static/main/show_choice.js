import {all_choice_list} from './get_all_dom_as_array.js'

var focus = ''
var face = ''

const _show_choice = (target) => {
    for (let i=0; i<all_choice_list.length; i++){
        if ( all_choice_list[i].id === target){
            all_choice_list[i].style.color = 'white'
        }else{
            all_choice_list[i].style.color = 'black'
        }
    }
}

export const get_focus = (id) => {
    focus = id
    const target = 'belongid-'+id+'-'+face
    _show_choice(target)
}

export const get_face = (f) => {
    face = f
    const target = 'belongid-'+focus+'-'+face
    _show_choice(target)
}
