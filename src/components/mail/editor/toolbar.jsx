import React from 'react';
import styles from './editor.module.css';
import { CommentRounded } from '@material-ui/icons';
import { connect } from 'react-redux';
import { setCommentBox } from '../../redux/action/action.actions';

function Toolbar({id, setCommentBox, setSelection}) {

    const runCommand = (command) => {
        document.execCommand(command, false, null);
    }

    const handleComment = () => {
        setCommentBox(true)
        setSelection()
    };

    return (
        <div id={id} className={styles.toolbar + ' ' + 'inline__toolbar display__none'}
        onClick={e => e.stopPropagation()}>
            <ul>
                <li onMouseDown={e => e.preventDefault()} onClick={() => runCommand("bold")}>B</li>
                <li onMouseDown={e => e.preventDefault()} onClick={() => runCommand("underline")}>U</li>
                <li onMouseDown={e => e.preventDefault()} onClick={() => runCommand("italic")}>I</li>
                <li onClick={handleComment}><CommentRounded /></li>
            </ul>
        </div>
    )
}
export default connect(null, {setCommentBox})(Toolbar)
