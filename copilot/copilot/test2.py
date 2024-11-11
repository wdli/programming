# write a function to parse an excel sheet that has the column: src ip, dest ip and dest property
# and print them out# 

# Path: github/programming/copilot/python/test.py
# write a function to parse an excel sheet that has the column: src ip, dest ip and dest property
# and print them out#
#
# Path: github/programming/copilot/python/test.py
# write a function to parse an excel sheet that has the column: src ip, dest ip and dest property
# and print them out

# Path: github/programming/copilot/python/test.py


import pandas as pd

def parse_excel_sheet(file_path):
    df = pd.read_excel(file_path)
    if {'src ip', 'dest ip', 'dest property'}.issubset(df.columns):
        return df[['src ip', 'dest ip', 'dest property']]
    else:
        raise ValueError('Excel sheet does not contain the required columns')
    

if __name__ == '__main__':
    print(parse_excel_sheet('test.xlsx'))
    



