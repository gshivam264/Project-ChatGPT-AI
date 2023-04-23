const API_KEY ='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'
const submitButton = document.querySelector('#submit')
const output = document.querySelector('#output')
const input = document.querySelector('input')
const history = document.querySelector('#history')
const button = document.querySelector('button')

function changeinput(value){
    input.value = value
}


async function getMessage(){
    const options = {
        method:'POST',
        headers:{
            'Authorization': `Bearer ${API_KEY}`,
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
            
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: input.value}],
                max_tokens:100
              
        })
    }
    try{
       const response = await fetch('https://api.openai.com/v1/chat/completions', options)
       const data = await response.json()
       output.textContent = data.choices[0].message.content
       if(data.choices[0].message.content && input.value){
        const p = document.createElement('p')
        p.textContent = input.value
        p.addEventListener('click',function(){
            changeinput(p.textContent)
        })
        history.append(p)
       }
    }
    catch (error){
       console.error(error)
    }
}   

submitButton.addEventListener('click', getMessage)

function clearinput(){
    input.value = ''
}

button.addEventListener('click',clearinput)