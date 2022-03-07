/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { findByCollectionAndId, updateDocByCollectionAndId } from '../../firebase/api/factory';
import styles from './editor.module.css';
import Toolbar from './toolbar';
import { onClickOutside } from './utility';
import { onSnapshot, doc, getFirestore } from '@firebase/firestore';
import { connect } from 'react-redux';
import { setActiveDoc, setSelectionState, setActiveComment } from '../../redux/action/action.actions';
import { useAuth } from '../../firebase/authContext';

function Editor({ id, type, selectType, setSelectionState, setActiveComment, setActiveDoc, disabled}) {
    const [fetched, setFetched] = useState(false);
    const [editingAllowed, setEditingAllowed] = useState(true);
	const innerRef = useRef();
    const {user} = useAuth();

	useEffect(() => {
        // HANDLES PAGE LOAD DATA LOADING
        if(fetched) return
        findByCollectionAndId('documents', id).then(res => {
            if(!innerRef.current) return
            innerRef.current.innerHTML = res.data().html;
            setFetched(true)
            setEditingAllowed(true)
        })  
	}, [innerRef.current]);

    useEffect(() => {
        // HANDLES FIREBASE WEBHOOK
        const db = getFirestore();
        onSnapshot(doc(db, "documents", id), (doc) => {
            if(doc.id !== id) return
            //console.log(`doc: ${id}-${type} -- edited`)
            let data = doc.data();
            setHtml(data)
        });
        return () => {
            setEditingAllowed(true)
        }
    }, [])

    function setHtml(data){
        if(!data) return
        if(data?.lastEditBy === user.uid){
            return setEditingAllowed(true)
        }else if(data.lastEditBy && (data.editingAllowed !== null)){
            setEditingAllowed(data?.editingAllowed)
        }
        if(!innerRef || !innerRef.current) return
        innerRef.current.innerHTML = data.html;
    }

    var timer;

    const handleInput = (evt) => {
        updateDocByCollectionAndId('documents', id, {
            lastEditBy: user.uid,
            html: evt.target.innerHTML,
            editingAllowed: false
        })
        clearTimeout(timer)
        timer = setTimeout(()=>{
            updateDocByCollectionAndId('documents', id, {
                editingAllowed: true
            })
        }, 3000)
    }

    // THIS HANDLES SELECT AND TOGGLES TOOLBAR OFF/ON
	const handleSelect = (e) => {
        // USED TO OPEN TOOLBAR ON SELECTING TEXT
        onClickOutside()
        const target = document.getSelection();
        if (target.anchorOffset === target.focusOffset) return
        let elem = document.getElementById(id);
        if(!elem) return console.log('returning')
        elem.classList.remove('display__none')
        let width = window.innerWidth;
        width = parseInt(width);
        elem.style.left = `${e.nativeEvent.layerX -30}px`;
        if(width > 1000){
            elem.style.top = `${e.nativeEvent.layerY - 70}px`;
        }else{  
            elem.style.left = '50%';
            elem.style.transform = 'translateX(-50%)';
            elem.style.top = `-100px`;
        }
	};

	function surroundSelection() {
        // FIRES ON CLICKING COMMENT BUTTON IN TOOLBAR, SET SELCTION STATE FOR 
        // ADDING COMMENT
        innerRef.current.focus();
		let selection = window.getSelection().getRangeAt(0);
        const select = {
            id: id,
            selection,
            type
        }
        setSelectionState(select)
	}

    const handleClick = (e) => {
        // USED TO HIGHLIGHT ATTACHED COMMENT IN SIDEBAR
        let elem = e.target;
        let elemString = elem.outerHTML.toString();
        if (!elemString.includes('inline__comment')) {
            elem = elem.parentNode;
        }
        const elemClass = elem.getAttribute('class');
        if(!elemClass || !elemClass.includes('inline__comment')) return setActiveComment(null);
        const uid = elemClass.split(' ')[1];
        setActiveComment(uid)

        const elema = document.getElementById('message__sidebar');
		const eleme = document.getElementById('message__toggler');
        elema.style.right = '0px';
		eleme.style.right = '240px';
        
    }
    const handleEditorClick = (e) => {
        // USED TO SET SELECTION TYPE
        e.stopPropagation();
        const target = document.getSelection(); 
        if (target.anchorOffset === target.focusOffset) onClickOutside();
        if(selectType === type) return
        const select = {
            ...selectType,
            type
        }
        // USED TO LOAD COMMENTS OF - BUSSINESS/PERSONAL/PEST/ETC
        setSelectionState(select)
        setActiveDoc(id)
    }

	return (
        <div className={styles.editor__parent}>
            <Toolbar id={id} onClick={e => e.stopPropagation()} setSelection={surroundSelection} />
            <div className={styles.editor__wrapper} onClick={handleEditorClick}>
                <div
                    className={(editingAllowed || !disabled) ? styles.editor : styles.editor + ' ' + styles.blockedEditor}
                    ref={innerRef}
                    id={id + 'editor'}
                    key="somekey"
                    contentEditable={disabled ? false: editingAllowed ? true : false}
                    onSelect={handleSelect}
                    onInput={handleInput}
                    onClick={handleClick}
                    onFocus={() => setActiveDoc(id)}
                ></div>
            </div>
        </div>
	);
}

const mapStateToProps = state => ({
    selectType : state.actionz.select.type
})
const actions = {setActiveComment, setSelectionState, setActiveDoc};
export default connect(mapStateToProps, actions)(Editor)
