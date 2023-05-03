import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, postQuestion, selectQuestions } from "../../store/questionReducer";
import { useEffect } from "react";
import QuestionPane from "../QuestionPane/QuestionPane";
import './QuestionList.css'
import { SubmitterInputPane } from "../SubmitterInputPane/SubmitterInputPane";
import { useState } from "react";

export function QuestionList({questions, formId}) {
    
    const dispatch = useDispatch();

    const [showQpane, setShowQpane] = useState(false);

    const [prompt, setPrompt] = useState("");
    const [description, setDescription] = useState("");

    function handleSave() {
        let newQuestion = {question: {
            prompt,
            description,
            formId
        }}

        dispatch(postQuestion(newQuestion));
        setShowQpane(false);
    }

    function handleCancel() {
        setShowQpane(false)
    }

    function injectQ () {
        return (
            <div className="qp-wrapper">
                <div className="ql-create">
                <div className="ql-header">Create New Question</div><br/>
                    <div className="qp-ele">
                        <label htmlFor="create-prompt">Question: </label>
                        <input value={prompt} id="create-prompt" onChange={(e) => {setPrompt(e.target.value)}}/>
                    </div>
                    <div className="qp-ele">
                        <label htmlFor="create-des">Description: </label>
                        <textarea value={description} id="create-des" onChange={(e) => {setDescription(e.target.value)}}/>
                    </div>
                    <div className="qp-save-cancel">
                        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                        <button className="save-button" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="ql-list">

            <div className="ql-header">
                Required Questions
            </div>

            <SubmitterInputPane disable={true}/>


            {showQpane ? null : <button onClick={() => {setShowQpane(true)}}>Add Question</button>}
            
            
            
            {showQpane ? injectQ() : null}
            
            <div className="ql-header">
                {(questions && questions.length > 0) ? "Your Additional Questions" : null}
            </div>
            <div className="ql-added-questions">

                {questions.map((q) => {
                    return <QuestionPane key ={q.id} question={q} formId={formId}/>
                })}
            </div>
        </div>
    );
}