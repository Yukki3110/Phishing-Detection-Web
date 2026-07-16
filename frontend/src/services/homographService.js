import { API } from "../api/endpoints";

export async function analyzeHomograph(url) {

    const response = await fetch(

        API.BASE_URL +
        API.HOMOGRAPH,

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

            "Homograph analysis failed."

        );

    }

    return await response.json();

}