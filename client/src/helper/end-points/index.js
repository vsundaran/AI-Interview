import { FLAN_MODAL_URL, HUGGING_FACE_BASE_URL, POST_DATA } from "../primary"

export const GET_QUESTIONS = async (DATA = {}, callback = () => { }) => {
    let response = await POST_DATA(HUGGING_FACE_BASE_URL + FLAN_MODAL_URL + '/flan-t5-large', DATA, process.env.REACT_APP_HUGGING_FACE_KEY);
    callback(response);
}