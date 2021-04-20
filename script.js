const body = document.querySelector('.formGroup')

function showFile(e){
    console.log(e)
    reader =  new FileReader(e.target.files[0])

    reader.readAsText(e.target.files[0]);

    reader.onloadend = function() {
        console.log(reader.result);
        let obj = JSON.parse(reader.result)
        console.log(obj)
        formGorup(obj)

    };

}

function formGorup(obj){
    let myForm, myH1;
    myForm = document.getElementsByTagName('form')
    if (myForm.length != 0){
        myForm[0].remove()
    }
    myForm = document.createElement('form');
    myForm.className = "form-group"
    body.appendChild(myForm);

    myH1 = document.createElement('h1');
    myH1.textContent = obj['name']
    myForm.appendChild(myH1);

    Object.keys(obj).forEach(element => {

        if(obj[element] instanceof Object) {
            let jsonObj = obj[element]
            switch(element) {
                case "fields":
                    console.log(obj[element])
                    Object.keys(jsonObj).forEach(element => {
                        if(jsonObj[element].input != undefined){
                            let p = document.createElement("label");
                            if (jsonObj[element].label != undefined){
                                p.className = "form-label"
                                p.innerHTML = jsonObj[element].label + "&nbsp;";
                                myForm.appendChild(p)
                            }
                            let n
                            if (jsonObj[element].input.type == "textarea"){
                                let t
                                t = document.createElement("textarea")
                                t.rows = 10
                                myForm.appendChild(t)
                            } else if(jsonObj[element].input.technologies instanceof Array){
                                let s
                                s = document.createElement("select")
                                jsonObj[element].input.technologies.forEach(element => {
                                    let o = document.createElement("option")
                                    o.value = o.innerText = element
                                    s.appendChild(o)
                                })
                                s.multiple = jsonObj[element].input.multiple
                                myForm.appendChild(s)
                            } else {
                                n = document.createElement("input");
                                n.className = "form-input"
                                n.type = jsonObj[element].input.type;
                                n.required = ((jsonObj[element].input.required == undefined || !jsonObj[element].input.required) ? false : true);
                                n.placeholder = ((jsonObj[element].input.placeholder == undefined || !jsonObj[element].input.placeholder) ? jsonObj[element].input.placeholder = '' : jsonObj[element].input.placeholder)
                                n.accept ="image/jpeg,image/png,application/pdf"
                                if (jsonObj[element].input.mask != undefined){
                                    n.type = "text"
                                    n.className = "mask"
                                    let mask = jsonObj[element].input.mask
                                    n.pattern = "^" + mask.replace(/9/g,"[0-9]") + "$"
                                    n.placeholder = jsonObj[element].input.mask
                                }
                                myForm.appendChild(n)
                            }
                        }

                    })
                    break;
                case "references":
                    let wrapper = document.createElement("div")
                    wrapper.className = "myDiv"
                    Object.keys(jsonObj).forEach(element => {
                        if(jsonObj[element].input != undefined){
                            let myCheckbox = document.createElement("input")
                            myCheckbox.type = jsonObj[element].input.type
                            myCheckbox.checked = jsonObj[element].input.checked
                            myCheckbox.required = jsonObj[element].input.required
                            wrapper.appendChild(myCheckbox)
                        }
                        if (jsonObj[element]["text without ref"] != undefined){
                            let myText = document.createElement("label")
                            myText.textContent = jsonObj[element]["text without ref"]
                            wrapper.appendChild(myText)
                        }
                        if (jsonObj[element]["text"] != undefined){
                            let myRef = document.createElement("a")
                            myRef.textContent = jsonObj[element]["text"]
                            myRef.setAttribute('href', jsonObj[element]["ref"])
                            wrapper.appendChild(myRef)
                        }
                        myForm.appendChild(wrapper)

                    })
                    break;
                case "buttons":
                    let myDiv = document.createElement("div")
                    myDiv.className = "myDiv"
                    Object.keys(jsonObj).forEach(element => {
                        if (jsonObj[element].text != undefined){
                            let myButton = document.createElement("button")
                            myButton.textContent = jsonObj[element].text
                            myButton.className = "form_button"
                            myDiv.appendChild(myButton)
                            myForm.appendChild(myDiv)
                        }
                    })
            }
        }
    })
}

function deleteForm(){
    let myForm;
    myForm = document.getElementsByTagName('form')
    myForm[0].remove()
}