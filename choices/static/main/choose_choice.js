
import {
    choice_set_list,
    all_choice_list,
    all_dice_mode_btn
} from './get_all_dom_as_array.js'
import { get_focus } from './show_choice.js';
import { get_mode } from './dice.js'

const dice_2_box = document.getElementById("die-2").parentElement
dice_2_box.hidden = true

const add_event_on_choice_set = (choice_set_list) => {
    for (let i = 0; i<choice_set_list.length; i++ ){
        choice_set_list[i].onclick = () => {
            change_choice_set(choice_set_list[i].id, choice_set_list); 
            change_choice(choice_set_list[i].id, all_choice_list);
            get_focus(choice_set_list[i].id)
        }
    }
}

const add_id_on_choice = (all_choice_list) => {
    const class_list = all_choice_list.map(el => el.className.split(" ")[1]);
    const class_set = Array.from(new Set(class_list));

    let class_set_idx = 0;
    let id = 1;
    for (let i = 0; i < class_list.length; i++) {
        if (class_set[class_set_idx] === class_list[i]){
            all_choice_list[i].setAttribute('id', class_list[i]+"-"+id);
            id++;
        }else{
            class_set_idx++;
            if (class_set[class_set_idx] === class_list[i]){
                id = 1;
                all_choice_list[i].setAttribute('id', class_list[i]+"-"+id);
                id++;
            }else{
                console.error('It is wrong');
            }
        }
    }
}

const change_choice = (focus_class, all_choice_list) => {

    const focused_choice_list = Array.from(document.querySelectorAll(".belongid-"+focus_class));

    for (let i=0; i<all_choice_list.length; i++){
        all_choice_list[i].hidden = true;
    }
    for (let i=0; i<focused_choice_list.length; i++){
        focused_choice_list[i].hidden = false;
    }
}

const change_choice_set =(focus_id, choice_set_list) => {

    for (let i=0; i<choice_set_list.length; i++){
        choice_set_list[i].style.color = 'black';
    }
    const focused_choice_set = document.getElementById(focus_id);
    focused_choice_set.style.color = 'white';
}

const control_dice_box = (mode) => {
    dice_2_box.hidden = (mode === "Default") ? true : false
}

const add_event_on_dice_mode_btn = (all_dice_mode_btn) => {

    for (let i = 0; i<all_dice_mode_btn.length; i++ ){
        all_dice_mode_btn[i].onclick = () => {
            const mode = all_dice_mode_btn[i].defaultValue
            get_mode(mode)
            control_dice_box(mode)
        }
    }
}

add_event_on_dice_mode_btn(all_dice_mode_btn);
add_event_on_choice_set(choice_set_list);
add_id_on_choice(all_choice_list);

const default_focus = choice_set_list[0].id;
change_choice(default_focus, all_choice_list);
change_choice_set(default_focus, choice_set_list)
get_focus(default_focus)