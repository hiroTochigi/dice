import {all_choice_list} from './get_all_dom_as_array.js'

var focus = ''
var face = ''

const user_choice = document.getElementById("your-choice");

const change_user_choice_text = (new_value) => {
    user_choice.innerText = new_value
}

const _show_choice = (target) => {
    for (let i=0; i<all_choice_list.length; i++){
        if ( all_choice_list[i].id === target){
            const new_value = all_choice_list[i].innerText
            change_user_choice_text(new_value)
            all_choice_list[i].style.color = 'white'
            all_choice_list[i].style.backgroundColor = 'black'
        }else{
            all_choice_list[i].style.color = 'black'
            all_choice_list[i].style.backgroundColor = 'white'
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
