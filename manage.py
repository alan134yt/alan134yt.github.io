import pandas as pd
from tabulate import tabulate
import keyboard
import os

# Define the CSV file path
CSV_FILE_PATH = 'ideas.csv'

def load_data():
    """Load the CSV file into a DataFrame."""
    if os.path.exists(CSV_FILE_PATH):
        return pd.read_csv(CSV_FILE_PATH)
    else:
        print('CSV file does not exist.')
        return pd.DataFrame(columns=['number', 'idea', 'show'])

def display_table(df):
    """Display the DataFrame as a table."""
    if df.empty:
        print("No data to display.")
        return
    
    df_display = df.copy()
    df_display = df_display[['number', 'idea', 'show']]
    df_display.columns = ['Number', 'Idea', 'Show']
    print(tabulate(df_display, headers='keys', tablefmt='grid', showindex=False))

def toggle_show(df, index):
    """Toggle the 'show' value for the given index."""
    if index < 0 or index >= len(df):
        print('Index out of range.')
        return
    
    if df.loc[index, 'show'] == 'true':
        df.loc[index, 'show'] = 'false'
    else:
        df.loc[index, 'show'] = 'true'

def save_data(df):
    """Save the DataFrame back to the CSV file."""
    df.to_csv(CSV_FILE_PATH, index=False)

def main():
    df = load_data()
    if df.empty:
        return
    
    while True:
        display_table(df)
        print("\nPress Enter to toggle 'show' status for the first row or 'q' to quit.")
        
        key = keyboard.read_event()
        
        if key.name == 'enter':
            toggle_show(df, 0)  # Toggle the first row as an example
            save_data(df)
        elif key.name == 'q':
            break

if __name__ == '__main__':
    main()
