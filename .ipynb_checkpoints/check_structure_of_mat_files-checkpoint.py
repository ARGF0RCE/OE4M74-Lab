import os
from scipy.io import loadmat

def inspect_mat_structure(mat_filename):
    # Load the .mat file
    mat_data = loadmat(mat_filename)
    
    # Print the structure
    for key, value in mat_data.items():
        if isinstance(value, (list, tuple, dict, str, bytes, bytearray, memoryview)):
            print(f"Variable: {key} \t Type: {type(value)} \t Length: {len(value)}")
        else:
            print(f"Variable: {key} \t Type: {type(value)} \t Shape: {value.shape}")

def inspect_dataset_structure_and_mat_files(root_dataset_path="../CWRU-dataset"):
    os.

# Inspect the structure of your .mat file
inspect_mat_structure('./Normal/100_Normal_3.mat')

