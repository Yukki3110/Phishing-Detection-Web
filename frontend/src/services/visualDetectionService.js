import { API } from "../api/endpoints";

export async function analyzeVisual(imageFile) {

    const formData = new FormData();

    formData.append(
        "image",
        imageFile
    );

    const response = await fetch(

        API.BASE_URL +
        API.VISUAL_DETECTION,

        {

            method: "POST",

            body: formData

        }

    );

    if (!response.ok) {

        throw new Error(
            "Visual detection failed."
        );

    }

    return await response.json();

}