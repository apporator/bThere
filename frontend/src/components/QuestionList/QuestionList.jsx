import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, selectQuestions } from "../../store/questionReducer";
import { useEffect } from "react";
import QuestionPane from "../QuestionPane/QuestionPane";
import './QuestionList.css'
import { SubmitterInputPane } from "../SubmitterInputPane/SubmitterInputPane";

export function QuestionList({questions, formId}) {
    // console.log(formId, "QuestionList");
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchQuestions(formId));
    // }, [dispatch])

    // const questions = useSelector(selectQuestions);
    // console.log(questions, "QUESTIONS");

    // debugger;

    return (
        <div className="ql-list">
            <SubmitterInputPane disable={true}/>
            {questions.map((q) => {
                return <QuestionPane key ={q.id} question={q} formId={formId}/>
            })}
            <QuestionPane createMode={true} formId={formId}/>
        </div>
    );
}