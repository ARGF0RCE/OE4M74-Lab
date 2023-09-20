import os
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from scipy.io import loadmat

def create_database_if_not_exists(db_params):
    # Connect to the default 'postgres' database
    conn = psycopg2.connect(dbname='postgres', user=db_params['user'], password=db_params['password'], host=db_params['host'])
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()

    # Check if the desired database exists
    cursor.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{db_params['dbname']}';")
    exists = cursor.fetchone()
    
    # If not, create the database
    if not exists:
        cursor.execute(f"CREATE DATABASE {db_params['dbname']};")
    
    # Close the connection to 'postgres' database
    cursor.close()
    conn.close()

def create_table_and_insert_data(mat_filepath, tablename, db_params):
    # Load the .mat file
    mat_data = loadmat(mat_filepath)
    
    # Extract data from the .mat file
    DE_time_data = mat_data.get('X100_DE_time', [])  # Using .get() to avoid KeyError
    FE_time_data = mat_data.get('X100_FE_time', [])
    RPM_data = float(mat_data.get('X100RPM', [[0]])[0][0])
    
    # Create database if doesn't exist
    create_database_if_not_exists(db_params)

    # Connect to the database
    conn = psycopg2.connect(**db_params)
    cursor = conn.cursor()

    # Create the table if it doesn't already exist
    create_table_cmd = f"""
    CREATE TABLE IF NOT EXISTS {tablename} (
        id SERIAL PRIMARY KEY,
        DE_time FLOAT,
        FE_time FLOAT,
        RPM FLOAT
    );
    """
    cursor.execute(create_table_cmd)

    # Insert data into the table
    for de_value, fe_value in zip(DE_time_data, FE_time_data):
        insert_cmd = f"INSERT INTO {tablename} (DE_time, FE_time, RPM) VALUES ({de_value[0]}, {fe_value[0]}, {RPM_data});"
        cursor.execute(insert_cmd)

    # Commit changes and close the connection
    conn.commit()
    cursor.close()
    conn.close()

def process_dataset_directory(directory_path, db_params):
    # Loop through the directory structure
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith('.mat'):
                # Construct table name based on directory and file name
                path_parts = os.path.relpath(root, directory_path).split(os.sep)
                file_base = os.path.splitext(file)[0]
                tablename = '_'.join(path_parts + [file_base])
                tablename = tablename.replace('@', 'At')  # SQL table names shouldn't contain '@'
                
                # Create table and insert data
                create_table_and_insert_data(os.path.join(root, file), tablename, db_params)

# Database connection parameters
db_params = {
    'dbname': 'lab_3_assignment',
    'user': 'postgres',
    'password': '123Data!@#',
    'host': 'localhost'
}

# Process the dataset directory
process_dataset_directory('path_to_dataset_directory', db_params)

