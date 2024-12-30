export const formateQuestions = (response) => {
    if (response?.type == "success") {
        let question = response?.result || [];
        //formating for the UI functionalities
        question.forEach((element, index) => {
            let conversationBundle = {}
            conversationBundle["message"] = element?.generated_text
            conversationBundle["message_sender"] = "AI"
            question[index] = conversationBundle
        });
        question.push({
            message_sender: "candidate",
            message: ``,
        });
        return question
    }
}