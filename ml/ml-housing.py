#!/usr/bin/python

import os
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import hashlib

HOUSING_PATH="../handson-ml/datasets/housing/"
HOUSING_FILE="housing.csv"



#
# test_set_check
#
def test_set_check(id, test_ratio, hash):
    return hash(np.int64(id)).digest()[-1] < 256*test_ratio

def split_training_data_by_id(data, test_ratio, id_col, hash=hashlib.md5):
    ids = data[id_col]
    in_test_set = ids.apply(lamda id_: test_set_check(id_, test_ratio, hash))
    return data.loc[~in_test_set], data.loc[in_test_set]

#
# split_training_data
#
def split_training_data(data, test_ratio):
    shuffled_indices = np.random.permutation(len(data))
    test_set_size = int(len(data)*test_ratio)
    test_indices = shuffled_indices[: test_set_size]
    training_indices = shuffled_indices[test_set_size:]
    return data.iloc[training_indices], data.iloc[test_indices]




#
# load_housing_data
#
def load_housing_data (housing_path=HOUSING_PATH, housing_file=HOUSING_FILE):
    csv_path = os.path.join(housing_path, housing_file)
    return pd.read_csv(csv_path)




#
# main
#
if __name__ == "__main__":
    print ("# Loading housing data ")
    housing = load_housing_data()
    print ("# Done loading housing data ")
    housing.hist(bins=50, figsize=(20,15))
    plt.show

