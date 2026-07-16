from pathlib import Path

from .phishunt_loader import load_phishunt_feed

from .threat_statistics import *


CSV_PATH = Path(
    "C:\Phishing-Detection-Web\\backend\\app\\engines\\threat_intelligence\\data\\phishunt_feed.csv"
)


def get_threat_dashboard():

    df = load_phishunt_feed(
        CSV_PATH
    )

    return {

        "active_urls":

            get_active_urls(df),

        "top_brands":

            get_top_brands(df),

        "top_countries":

            get_top_countries(df),

        "top_hosting":

            get_top_hosting(df),

        "top_tlds":

            get_top_tlds(df),

        "latest_urls":

            get_latest_urls(df)

    }