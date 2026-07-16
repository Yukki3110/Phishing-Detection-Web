import pandas as pd


def load_phishunt_feed(csv_path: str):

    df = pd.read_csv(csv_path)

    return df