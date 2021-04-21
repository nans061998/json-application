const body = document.querySelector('.formGroup')

function show_file(e){
    console.log(e)
    let reader =  new FileReader(e.target.files[0])

    reader.readAsText(e.target.files[0]);

    reader.onloadend = function() {
        console.log(reader.result);
        let obj = JSON.parse(reader.result)
        create_form(obj)
    };
}

function create_form(obj){
    let form, title;
    form = document.getElementsByTagName('form')
    if (form.length != 0){
        form[0].remove()
    }
    form = document.createElement('form');
    form.className = "form-group"
    body.appendChild(form);

    title = document.createElement('h1');
    title.textContent = obj['name']
    form.appendChild(title);

    Object.keys(obj).forEach(element => {
        if(obj[element] instanceof Object) {
            let jsonObj = obj[element]
            switch(element) {
                case "fields":
                    Object.keys(jsonObj).forEach(element => {
                        if(jsonObj[element].input != undefined){
                            form.appendChild(create_fields_label(jsonObj, element))
                            if (jsonObj[element].input.type == "textarea"){
                                form.appendChild(create_fields_textarea())
                            } else if(jsonObj[element].input.technologies instanceof Array){
                                form.appendChild(create_fields_checkbox(jsonObj, element))
                            } else {
                                form.appendChild(create_fields_input(jsonObj,element))
                            }
                        }
                    })
                    break;
                case "references":
                    if (create_references(jsonObj) != undefined){
                        form.appendChild(create_references(jsonObj))
                    }
                    break;
                case "buttons":
                    if (create_buttons(jsonObj) != undefined){
                        form.appendChild(create_buttons(jsonObj));
                    }
                    break
            }
        }
    })
}


function delete_form(){
    let form;
    form = document.getElementsByTagName('form')
    form[0].remove()
}

function create_fields_label(param, temp){
    let fields_container = document.createElement("label");
    if (param[temp].label != undefined){
        fields_container.className = "form-label"
        fields_container.innerHTML = param[temp].label + "&nbsp;";
    }
    return fields_container
}

function create_fields_textarea(){
    let textarea
    textarea = document.createElement("textarea")
    textarea.rows = 10
    return textarea
}

function create_fields_checkbox(param, item){
    let div_checkbox
    div_checkbox = document.createElement("div")
    param[item].input.technologies.forEach(item => {
        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        let label = document.createElement("label")
        label.textContent = label.innerText = item
        label.appendChild(checkbox)
        div_checkbox.appendChild(label)
    })
    return div_checkbox
}

function create_fields_input(param, item){
    let input
    input = document.createElement("input");
    input.className = "form-input"
    input.type = param[item].input.type;
    input.required = ((param[item].input.required == undefined || !param[item].input.required) ? false : true);
    input.placeholder = ((param[item].input.placeholder == undefined || !param[item].input.placeholder) ? param[item].input.placeholder = '' : param[item].input.placeholder)
    input.accept ="image/jpeg,image/png,application/pdf"
    if (param[item].input.mask != undefined){
        input.type = "text"
        input.className = "mask"
        let mask = param[item].input.mask
        input.pattern = "^" + mask.replace(/9/g,"[0-9]").replace(/\+/,"[+]").replace(/\(/,"[(]").replace(/[)]/,"[)]") + "$"
        input.placeholder = param[item].input.mask
    }
    return input
}

function create_references(param){
    if (param.length != 0){
        let div_references = document.createElement("div")
        div_references.className = "div_references"
        Object.keys(param).forEach(element => {
            if(param[element].input != undefined){
                let checkbox = document.createElement("input")
                checkbox.type = param[element].input.type
                checkbox.checked = param[element].input.checked
                checkbox.required = param[element].input.required
                div_references.appendChild(checkbox)
            }
            if (param[element]["text without ref"] != undefined){
                let label = document.createElement("label")
                label.textContent = param[element]["text without ref"]
                div_references.appendChild(label)
            }
            if (param[element]["text"] != undefined){
                let ref = document.createElement("a")
                ref.textContent = param[element]["text"]
                ref.setAttribute('href', param[element]["ref"])
                div_references.appendChild(ref)
            }
        })
        return div_references
    } else{ return undefined}
}

function create_buttons(param){
    if (param.length != 0){
        let div_buttons = document.createElement("div")
        div_buttons.className = "div_references"
        param.forEach(element => {
            if (element.text != undefined){
                let button = document.createElement("button")
                button.textContent = element.text
                button.className = "form_button"
            }
        })
        return div_buttons
    } else {
        return undefined
    }

}

