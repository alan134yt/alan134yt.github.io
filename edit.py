import argparse
import pandas as pd
import os

# Define the CSV file path
CSV_FILE_PATH = 'ideas.csv'

def add_idea(idea):
    # Load existing data
    if os.path.exists(CSV_FILE_PATH):
        df = pd.read_csv(CSV_FILE_PATH)
    else:
        # Create a new DataFrame with appropriate columns if the file doesn't exist
        df = pd.DataFrame(columns=['number', 'idea', 'show'])
    
    # Determine the next number
    next_number = df['number'].max() + 1 if not df.empty else 1
    
    # Create a new row
    new_row = pd.DataFrame([[f'{next_number:04d}', idea, 'true']], columns=['number', 'idea', 'show'])
    
    # Append the new row to the DataFrame
    df = pd.concat([df, new_row], ignore_index=True)
    
    # Save the updated DataFrame to the CSV file
    df.to_csv(CSV_FILE_PATH, index=False)
    print(f'Added new idea: "{idea}" with number {next_number:04d} and show true.')

def set_false(number):
    # Load existing data
    if not os.path.exists(CSV_FILE_PATH):
        print('CSV file does not exist.')
        return

    df = pd.read_csv(CSV_FILE_PATH)
    
    # Check if the number exists
    if number not in df['number'].values:
        print(f'No idea found with number {number}.')
        return
    
    # Set the 'show' field to false
    df.loc[df['number'] == number, 'show'] = 'false'
    
    # Save the updated DataFrame to the CSV file
    df.to_csv(CSV_FILE_PATH, index=False)
    print(f'Updated idea number {number} to show false.')

def main():
    # Set up command-line argument parsing
    parser = argparse.ArgumentParser(description='Manage ideas in a CSV file.')
    parser.add_argument('-a', '--add', type=str, help='Add a new idea to the CSV file.')
    parser.add_argument('-f', '--false', type=str, help='Set the show field to false for the specified number.')

    args = parser.parse_args()

    if args.add:
        add_idea(args.add)
    elif args.false:
        set_false(args.false)
    else:
        print('No action specified. Use -a to add an idea or -f to set an idea to false.')

if __name__ == '__main__':
    main()
