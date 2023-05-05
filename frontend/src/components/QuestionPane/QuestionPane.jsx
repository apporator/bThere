import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion, fetchQuestion, postQuestion, selectQuestion } from "../../store/questionReducer";
import './QuestionPane.css'
import {AiFillEdit} from 'react-icons/ai'
import {FaCheck} from 'react-icons/fa'
import {AiFillDelete} from 'react-icons/ai'

export default function QuestionPane ({question, createMode, formId}) {
    // console.log(formId, "FORM ID IN QP")

    if(createMode) {
        question = {
            prompt: "",
            description: ""
        }
    }

    const [editMode, setEditMode] = useState(false);
    const [prompt, setPrompt] = useState(question.prompt);
    const [description, setDescription] = useState(question.description);

    
    const dispatch = useDispatch();

    function updateQuestion () {
        let updatedQuestion = {question: {
            prompt,
            description
        }}
        // debugger

        if (createMode) {
            updatedQuestion.question.formId = formId
            // debugger;
            dispatch(postQuestion(updatedQuestion));
            setDescription("");
            setPrompt("");
        } else {
            dispatch(postQuestion(updatedQuestion, question.id))
            setEditMode(false);
        }
    }

    function actionButton() {
        if (editMode) {
            return <button onClick={updateQuestion}>Save</button>
        } else if (createMode) {
            return null
        }
        else {
            return (<>
                <button onClick={() => setEditMode(true)}>Edit</button>
                <button onClick={() => {dispatch(deleteQuestion(question.id))}}>Delete</button>
            </>)
        }
    }

    function injectIcons() {
        if (editMode) {
            return (
            <>
            <div></div>
            <div className="qp-mod-icon qp-save-icon" onClick={updateQuestion}><FaCheck/></div>
            </>)
        } else if (createMode) {
            return null;
        }
        else {
            return (<>
                    <div className="qp-mod-icon qp-del-icon" onClick={() => {dispatch(deleteQuestion(question.id))}}><AiFillDelete/></div>
                    <div className="qp-mod-icon qp-edit-icon" onClick={() => setEditMode(true)}><AiFillEdit/></div>
                </>)
        }
    }

    // let a = {question: {formId: 1, prompt: "updated another",required: true, description: "hd"}}
    
    // return null;
    return (<div className="qp-wrapper">
        <div className="qp-mod-button-wrapper">
            {injectIcons()}
        </div>
        <div className="qp">
            <div className="qp-ele">
                {(editMode || createMode) ? <input placeholder="enter the question here" type="text" value={prompt} onChange={(e) => {setPrompt(e.target.value)}}/> : <h2>{prompt}</h2>}
                
            </div>

            {!description && !(editMode || createMode) ? null :
                <div className="qp-ele">
                    {(editMode || createMode) ? <textarea placeholder="enter a description here" value={description} onChange={(e) => {setDescription(e.target.value)}}/> : <h2>{description}</h2>}
                </div>
            }


            {/* {actionButton()} */}

        </div>
    </div>);
}