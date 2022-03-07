function surroundSelection(innerRef, allComments, setAllComments) {
    let comments = [...allComments];
    let selection = window.getSelection().getRangeAt(0);
    let selectedText = selection.extractContents();
    let span = document.createElement('span');
    let id = 't' + Date.now();
    span.className = `inline__comment ${id}`;
    span.appendChild(selectedText);
    selection.insertNode(span);
    comments.push(id)
    setAllComments(comments)
    setHtml(innerRef.current.innerHTML)
}
export const onClickOutside = () => {
    let elems = document.querySelectorAll('.inline__toolbar');
    if(!elems) return
    for(const elem of elems){
        elem.classList.add('display__none')
    }
}