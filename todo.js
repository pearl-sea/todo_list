
const addBtn = document.querySelector('.add-button');
const currentList = document.querySelector('.todo-list');
const addInput = document.querySelector('.input');
let count = 0;


function addTodo(){

    if(addInput.value === ''){
        alert('입력된 내용이 없어요.')
    } else {

        const list = document.createElement('li');
        currentList.appendChild(list)

        const p = document.createElement('p');
        p.textContent = addInput.value;
       
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type','checkbox')
        
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete')
        deleteBtn.innerHTML = `<i class="material-icons">close</i>`

        list.appendChild(checkbox)
        list.appendChild(p)
        list.appendChild(deleteBtn)

        count++
        list.classList.add('list'+count)
        
        addInput.value = '';
    }
}
addBtn.addEventListener('click',addTodo)
addInput.addEventListener('keypress',event=>{

    if(event.key === 'Enter'){
        addTodo();
    }
})

        
function modifyTodo(event){

    if (event.target.tagName !== 'P') {
    return;
    }

    const input = document.createElement('input');
    input.classList.add('modify')
    input.setAttribute('type','text')
    input.value = event.target.textContent;

    const targetList = event.target;
    const list = targetList.parentElement
    targetList.textContent = '';
    list.insertBefore(input, list.childNodes[2])
    targetList.remove();

    input.focus();
    event.stopPropagation();

    input.addEventListener('blur', outFocus)
   
}
currentList.addEventListener('click', modifyTodo)

function outFocus(event){

    const input = event.target;
    const list = input.parentElement

    const p = document.createElement('p')
    const content = input.value;

    list.insertBefore(p, list.childNodes[2])
    p.textContent = content;
    list.removeChild(input);

}

function deleteTodo(event){
    if (event.target.tagName !== 'I'){
        return;
    }

    let confirmDelete = confirm('정말로 삭제하실건가요?')

    if(confirmDelete){
        event.target.closest('li').remove();
    }
}
currentList.addEventListener('click', deleteTodo)


function checkTodo(event){
    if (event.target.getAttribute('type') !== 'checkbox'){
        return;
    }

    if (event.target.checked){
        event.target.nextElementSibling.classList.add('line-through')
    } else {
        event.target.nextElementSibling.classList.remove('line-through')
    }

}

currentList.addEventListener('click', checkTodo)

//li태그 개수의 변화를 감지하는 observer 객체
let observer = new MutationObserver((mutations)=>{

    let nolist = document.createElement('li')
    nolist.classList.add('nolist')
    nolist.textContent = '내용이 없어요.'

    if (currentList.childElementCount > 1) {
        nolist = document.querySelector('.nolist')
        if (nolist){
            nolist.remove();
        }
    } else if (currentList.childElementCount === 0){
        currentList.appendChild(nolist)
    } 

})

let option = {
    attributes: true,
    childList: true,
    characterData: true
};

observer.observe(currentList, option)