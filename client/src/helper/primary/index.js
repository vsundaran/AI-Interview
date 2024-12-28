export const HUGGING_FACE_BASE_URL = "https://api-inference.huggingface.co";
export const FLAN_MODAL_URL = "/models/google"

export const POST_DATA = async (URL = '', DATA = {}, TOKEN_NAME = "") => {
    try {
        const response = await fetch(
            URL,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN_NAME}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(DATA),
            }
        );
        const result = await response.json();
        return { result, type: "success" };
    } catch (error) {
        console.error("API Error:", error);
        return { error: error, type: "failed" }
    }
}
