import { API } from "../api/endpoints";

export async function analyzeAttachment(file) {

    const formData = new FormData();

    formData.append(
        "file",
        file
    );

    const response = await fetch(

        API.BASE_URL +
        API.ATTACHMENT_ANALYSIS,

        {

            method: "POST",

            body: formData

        }

    );

    if (!response.ok) {

        throw new Error(

            "Attachment analysis failed"

        );

    }

    return await response.json();

}