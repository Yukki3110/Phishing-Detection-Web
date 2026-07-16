import pandas as pd


def get_active_urls(df):

    return len(df)


def get_top_brands(df):

    return (
        df["company"]
        .fillna("Unknown")
        .value_counts()
        .head(10)
        .to_dict()
    )


def get_top_countries(df):

    return (
        df["country"]
        .fillna("Unknown")
        .value_counts()
        .head(10)
        .to_dict()
    )


def get_top_hosting(df):

    return (
        df["org"]
        .fillna("Unknown")
        .value_counts()
        .head(10)
        .to_dict()
    )


def get_top_tlds(df):

    tlds = (
        df["domain"]
        .fillna("")
        .str.split(".")
        .str[-1]
    )

    return (
        tlds
        .value_counts()
        .head(10)
        .to_dict()
    )


def get_latest_urls(df):

    latest = (

        df

        .sort_values(

            "first_seen",

            ascending=False

        )

        .head(10)

    )

    return latest[[

        "url",

        "company",

        "country",

        "first_seen"

    ]].to_dict(

        orient="records"

    )