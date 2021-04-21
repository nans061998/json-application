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
                    console.log(obj[element])
                    Object.keys(jsonObj).forEach(element => {
                        if(jsonObj[element].input != undefined){
                            let fields_container = document.createElement("label");
                            if (jsonObj[element].label != undefined){
                                fields_container.className = "form-label"
                                fields_container.innerHTML = jsonObj[element].label + "&nbsp;";
                                form.appendChild(fields_container)
                            }
                            let input
                            if (jsonObj[element].input.type == "textarea"){
                                let textarea
                                textarea = document.createElement("textarea")
                                textarea.rows = 10
                                form.appendChild(textarea)
                            } else if(jsonObj[element].input.technologies instanceof Array){
                                let div_checkbox
                                div_checkbox = document.createElement("div")
                                jsonObj[element].input.technologies.forEach(element => {
                                    let checkbox = document.createElement("input")
                                    checkbox.type = "checkbox"
                                    let label = document.createElement("label")
                                    label.textContent = label.innerText = element
                                    label.appendChild(checkbox)
                                    div_checkbox.appendChild(label)
                                })
                                form.appendChild(div_checkbox)
                            } else {
                                input = document.createElement("input");
                                input.className = "form-input"
                                input.type = jsonObj[element].input.type;
                                input.required = ((jsonObj[element].input.required == undefined || !jsonObj[element].input.required) ? false : true);
                                input.placeholder = ((jsonObj[element].input.placeholder == undefined || !jsonObj[element].input.placeholder) ? jsonObj[element].input.placeholder = '' : jsonObj[element].input.placeholder)
                                input.accept ="image/jpeg,image/png,application/pdf"
                                if (jsonObj[element].input.mask != undefined){
                                    input.type = "text"
                                    input.className = "mask"
                                    let mask = jsonObj[element].input.mask
                                    input.pattern = "^" + mask.replace(/9/g,"[0-9]").replace(/\+/,"[+]").replace(/\(/,"[(]").replace(/[)]/,"[)]") + "$"
                                    input.placeholder = jsonObj[element].input.mask
                                }
                                form.appendChild(input)
                            }
                        }

                    })
                    break;
                case "references":
                    let div_references = document.createElement("div")
                    div_references.className = "div_references"
                    Object.keys(jsonObj).forEach(element => {
                        if(jsonObj[element].input != undefined){
                            let checkbox = document.createElement("input")
                            checkbox.type = jsonObj[element].input.type
                            checkbox.checked = jsonObj[element].input.checked
                            checkbox.required = jsonObj[element].input.required
                            div_references.appendChild(checkbox)
                        }
                        if (jsonObj[element]["text without ref"] != undefined){
                            let label = document.createElement("label")
                            label.textContent = jsonObj[element]["text without ref"]
                            div_references.appendChild(label)
                        }
                        if (jsonObj[element]["text"] != undefined){
                            let ref = document.createElement("a")
                            ref.textContent = jsonObj[element]["text"]
                            ref.setAttribute('href', jsonObj[element]["ref"])
                            div_references.appendChild(ref)
                        }
                        form.appendChild(div_references)

                    })
                    break;
                case "buttons":
                    console.log(create_buttons(jsonObj))
                    // let myDiv = document.createElement("div")
                    // myDiv.className = "myDiv"
                    // Object.keys(jsonObj).forEach(element => {
                    //     if (jsonObj[element].text != undefined){
                    //         let myButton = document.createElement("button")
                    //         myButton.textContent = jsonObj[element].text
                    //         myButton.className = "form_button"
                    //         myDiv.appendChild(myButton)
                    //         myForm.appendChild(myDiv)
                    //     }
                    // })
            }
        }
    })
}


function delete_form(){
    let form;
    form = document.getElementsByTagName('form')
    form[0].remove()
}

function create_buttons(jsonObj){
    let div_buttons = document.createElement("div")
    div_buttons.className = "div_references"
    Object.keys(jsonObj).forEach(element => {
        if (jsonObj[element].text != undefined){
            let button = document.createElement("button")
            button.textContent = jsonObj[element].text
            button.className = "form_button"
            return div_buttons.appendChild(button)
        }
    })
}