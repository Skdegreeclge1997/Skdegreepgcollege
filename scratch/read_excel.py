import pandas as pd
import sys

try:
    # Read the excel file
    file_path = r'c:\Users\janak\Downloads\_Projects\SK degree college\project docs\Student_Inquiries_SK_College.xlsx'
    df = pd.read_excel(file_path)
    
    # Format and print as markdown
    print(df.to_markdown(index=False))
except Exception as e:
    print(f"Error reading Excel: {e}")
