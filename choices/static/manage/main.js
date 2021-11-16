
const choice_box_arr = Array.from(document.querySelectorAll(".manage-choice-box"));
const choice_set_arr = Array.from(document.querySelectorAll(".choice-set-box"));



const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;   
}

const hide_all_choice_box = () => {
    for ( let i=0; i<choice_box_arr.length; i++ ){
        choice_box_arr[i].hidden = true;
    }
}

const change_value_same_class = (class_name, value) => {
    const class_component_arr = Array.from(document.querySelectorAll(class_name))
    for ( let i=0; i<class_component_arr.length; i++ ){
        class_component_arr[i].value = value;
    }
}

hide_all_choice_box()

const csrftoken = getCookie('csrftoken');

for (let i=0; i<choice_set_arr.length; i++){
    
    const [
        hidden,
        choice_set_name,
        expand_shrik_btn,
        input,
        change_btn,
        delete_btn,
        save_btn,
        manage_choice_box
    ] = choice_set_arr[i].children

    const [edit_changeset_url, delete_changeset_url, choice_set_id] = hidden.innerHTML.split(' ')
    
    expand_shrik_btn.onclick = () => {
        change_value_same_class(".expand-shrink-btn", "Expand")
        if (manage_choice_box.hidden){
            hide_all_choice_box()
            manage_choice_box.hidden = false
            expand_shrik_btn.value = "Shrink"
        }else{
            hide_all_choice_box()
            expand_shrik_btn.value = "Expand"
        }
        
    }

    change_btn.onclick = () => {
        if(input.hidden){
            input.hidden = false
            save_btn.hidden = false
            expand_shrik_btn.hidden = true
            delete_btn.hidden = true
            change_btn.value = "Cancel"
        }else{
            input.hidden = true
            save_btn.hidden = true
            expand_shrik_btn.hidden = false 
            delete_btn.hidden = false
            change_btn.value = "Change Name"
        }
    }

    save_btn.onclick = () => {
        if (!(input.value === "" || !input.value)){

            const data = {
                'choice_set_id': choice_set_id ,
                'input': input.value,
            }

            fetch(edit_changeset_url, {
            credentials: 'include',
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
                'mode': 'same-origin'
            }
            }).then(res => res.json())
            .then(response => {
                choice_set_name.innerHTML = response['new_val']
                input.hidden = true
                save_btn.hidden = true
                expand_shrik_btn.hidden = false 
                change_btn.value = "Change Name"
                delete_btn.hidden = false
                input.value = ""
            })
            .catch(error => console.error('Error:', error));
        }
    }

    delete_btn.onclick = () => {

        const data = {
            'choice_set_id': choice_set_id 
        }

        const yes = confirm("Are you sure to delete choice_set?")

        if(yes){
            fetch(delete_changeset_url, {
            credentials: 'include',
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
                'mode': 'same-origin'
            }
            }).then(res => res.json())
            .then(response => {
                choice_set_arr[i].parentElement.removeChild(choice_set_arr[i]);
                const choic_eset_name = response['choice_set_name']
                alert(choic_eset_name + " is deleted")

            })
            .catch(error => 
                {
                    console.error('Error:', error)
                    alert("Delete is failed")
                });
        }else{
            alert("Delete is cancelled")
        }

    }

    const all_div = Array.from(manage_choice_box.childNodes).filter(el => el.firstChild)

    for (let ii=0; ii<all_div.length; ii++){

        const [p, input, btn, save_btn, hidden] = all_div[ii].children

        btn.onclick = () => {
            if (btn.value === 'Change Name'){
                input.hidden = false
                save_btn.hidden = false
                btn.value = "Cancel"
            }else if (btn.value === 'Cancel'){
                input.hidden = true
                save_btn.hidden = true
                btn.value = "Change Name"
            }
        }

        save_btn.onclick = () => {
            const [edit_url, choice_id] = hidden.innerHTML.split(' ')

            if (!(input.value === "" || !input.value)){
                const data = {
                    'choice_id': choice_id,
                    'input': input.value,
                }

                fetch(edit_url, {
                credentials: 'include',
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                    'mode': 'same-origin'
                }
                }).then(res => res.json())
                .then(response => {
                    p.innerHTML = response['new_val']
                })
                .catch(error => console.error('Error:', error));
            }
            
            input.value = null
            input.hidden = true
            save_btn.hidden = true
            btn.value = "Change Name"
        }

    }
}
