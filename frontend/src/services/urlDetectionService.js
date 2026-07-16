import { API } from "../api/endpoints";

export async function analyzeURL(url) {

    const response = await fetch(

        API.BASE_URL +

        API.URL_DETECTION,

        {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                url: url

            })

        }

    );

    if (!response.ok) {

        throw new Error(

            "URL Detection failed"

        );

    }

    return await response.json();

}