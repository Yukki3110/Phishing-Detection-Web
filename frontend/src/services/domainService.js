import { API } from "../api/endpoints";

export async function analyzeDomain(url) {

    const response = await fetch(
        API.BASE_URL +
        API.DOMAIN_INTELLIGENCE,
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
            "Domain analysis failed"
        );
    }

    return await response.json();
}