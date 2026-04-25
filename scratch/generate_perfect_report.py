import pandas as pd
import re
from datetime import datetime
from openpyxl import Workbook
from openpyxl.styles import Font, Fill, Alignment, PatternFill, Border, Side
from openpyxl.drawing.image import Image
from PIL import Image as PILImage
import os

def generate_perfect_report():
    input_file = r'c:\Users\janak\Downloads\_Projects\SK degree college\project docs\Student_Inquiries_SK_College.xlsx'
    output_file = r'c:\Users\janak\Downloads\_Projects\SK degree college\project docs\SK_College_Application_Report.xlsx'
    logo_path = r'c:\Users\janak\Downloads\_Projects\SK degree college\public\logo.jpeg' # Corrected path

    # 1. Read and Process Data
    try:
        df = pd.read_excel(input_file)
    except Exception as e:
        print(f"Error reading input file: {e}")
        return

    processed_data = []
    for i, row in df.iterrows():
        # Regex to parse Group and Address from message
        message = str(row.get('message', ''))
        group_match = re.search(r'Group:\s*([^|]+)', message)
        address_match = re.search(r'Address:\s*(.+)', message)
        
        group = group_match.group(1).strip() if group_match else 'N/A'
        address = address_match.group(1).strip() if address_match else 'N/A'
        
        processed_data.append({
            'S.No': i + 1,
            'Student Name': row.get('name', 'N/A'),
            "Father's Name": row.get('father_name', 'N/A'),
            'Email': row.get('email', 'N/A'),
            'Phone': str(row.get('phone', 'N/A')),
            'Course Applied': row.get('course', 'N/A'),
            'Group': group,
            'Status': row.get('status', 'New') or 'New',
            'Applied Date': pd.to_datetime(row.get('created_at')).strftime('%d %b %Y') if row.get('created_at') else 'N/A',
            'Address': address,
            'Application ID': str(row.get('id', ''))[:8].upper()
        })

    # 2. Create Workbook and Styles
    wb = Workbook()
    ws = wb.active
    ws.title = "Admission Report"

    # Define Colors
    DARK_GREEN = "1B5E20"
    MEDIUM_GREEN = "2E7D32"
    LIGHT_GREEN_BG = "E8F5E9"
    GOLD = "F9A825"
    HEADER_GREEN = "388E3C"
    WHITE = "FFFFFF"
    GREY = "757575"
    ROW_ALT = "F1F8E9"

    # Borders
    thin_border = Border(left=Side(style='thin', color='CCCCCC'), 
                        right=Side(style='thin', color='CCCCCC'), 
                        top=Side(style='thin', color='CCCCCC'), 
                        bottom=Side(style='thin', color='CCCCCC'))

    # 3. Header Section (Rows 1-7)
    # Row 1
    ws.row_dimensions[1].height = 60
    ws.merge_cells('B1:L1')
    ws['B1'].fill = PatternFill(start_color=DARK_GREEN, end_color=DARK_GREEN, fill_type="solid")
    ws['A1'].fill = PatternFill(start_color=DARK_GREEN, end_color=DARK_GREEN, fill_type="solid")
    ws['B1'] = "S.K. DEGREE COLLEGE & PG COLLEGE"
    ws['B1'].font = Font(name='Arial', size=20, bold=True, color=WHITE)
    ws['B1'].alignment = Alignment(horizontal='center', vertical='center')

    # Row 2
    ws.row_dimensions[2].height = 22
    ws.merge_cells('A2:L2')
    ws['A2'].fill = PatternFill(start_color=MEDIUM_GREEN, end_color=MEDIUM_GREEN, fill_type="solid")
    ws['A2'] = "Affiliated to Andhra University | Established in 2005"
    ws['A2'].font = Font(name='Arial', size=12, bold=True, color=WHITE)
    ws['A2'].alignment = Alignment(horizontal='center', vertical='center')

    # Row 3
    ws.row_dimensions[3].height = 18
    ws.merge_cells('A3:L3')
    ws['A3'] = "School Nagar, Ayyannapet Junction, Vizianagaram, Andhra Pradesh"
    ws['A3'].font = Font(name='Arial', size=10, color=DARK_GREEN)
    ws['A3'].alignment = Alignment(horizontal='center', vertical='center')

    # Row 4
    ws.row_dimensions[4].height = 16
    ws.merge_cells('A4:L4')
    ws['A4'] = "Ph: 94412 53163 | Email: arunodayaes@yahoo.com | www.skdegreecollege.com"
    ws['A4'].font = Font(name='Arial', size=9, italic=True, color=GREY)
    ws['A4'].alignment = Alignment(horizontal='center', vertical='center')

    # Row 5 - Gold Divider
    ws.row_dimensions[5].height = 8
    ws.merge_cells('A5:L5')
    ws['A5'].fill = PatternFill(start_color=GOLD, end_color=GOLD, fill_type="solid")

    # Row 6
    ws.row_dimensions[6].height = 22
    ws.merge_cells('A6:L6')
    ws['A6'].fill = PatternFill(start_color=LIGHT_GREEN_BG, end_color=LIGHT_GREEN_BG, fill_type="solid")
    ws['A6'] = "ONLINE APPLICATION LIST – ADMISSIONS 2026-27"
    ws['A6'].font = Font(name='Arial', size=13, bold=True, color=DARK_GREEN)
    ws['A6'].alignment = Alignment(horizontal='center', vertical='center')

    # Row 7
    ws.row_dimensions[7].height = 16
    ws.merge_cells('A7:L7')
    now = datetime.now().strftime("%d %B %Y | %I:%M %p")
    ws['A7'] = f"Date of Printing: {now}"
    ws['A7'].font = Font(name='Arial', size=9, italic=True, color=GREY)
    ws['A7'].alignment = Alignment(horizontal='right', vertical='center')

    # 4. Column Headers (Row 8)
    headers = ["S.No", "Student Name", "Father's Name", "Email", "Phone", "Course Applied", "Group", "Status", "Applied Date", "Address", "Application ID"]
    ws.row_dimensions[8].height = 30
    for col_num, header in enumerate(headers, 1):
        cell = ws.cell(row=8, column=col_num)
        cell.value = header
        cell.fill = PatternFill(start_color=HEADER_GREEN, end_color=HEADER_GREEN, fill_type="solid")
        cell.font = Font(name='Arial', size=10, bold=True, color=WHITE)
        cell.alignment = Alignment(horizontal='center', vertical='center')
        cell.border = thin_border

    # Set Column Widths
    widths = [5, 22, 20, 28, 14, 30, 12, 12, 22, 40, 20]
    for i, width in enumerate(widths, 1):
        ws.column_dimensions[ws.cell(row=8, column=i).column_letter].width = width

    # 5. Data Rows (Row 9+)
    current_row = 9
    for data in processed_data:
        ws.row_dimensions[current_row].height = 20
        fill = PatternFill(start_color=ROW_ALT, end_color=ROW_ALT, fill_type="solid") if current_row % 2 == 0 else None
        
        for col_num, key in enumerate(headers, 1):
            cell = ws.cell(row=current_row, column=col_num)
            cell.value = data[key]
            if fill: cell.fill = fill
            cell.font = Font(name='Arial', size=9)
            cell.alignment = Alignment(vertical='center', wrap_text=True if key == 'Address' else False)
            cell.border = thin_border
            
            # Status Badge Styling
            if key == 'Status':
                val = str(cell.value)
                if val == 'New':
                    cell.fill = PatternFill(start_color="E3F2FD", end_color="E3F2FD", fill_type="solid")
                    cell.font = Font(name='Arial', size=9, bold=True, color="1565C0")
                elif val == 'Processed' or val == 'Confirmed':
                    cell.fill = PatternFill(start_color="E8F5E9", end_color="E8F5E9", fill_type="solid")
                    cell.font = Font(name='Arial', size=9, bold=True, color="2E7D32")
                elif val == 'Rejected':
                    cell.fill = PatternFill(start_color="FFEBEE", end_color="FFEBEE", fill_type="solid")
                    cell.font = Font(name='Arial', size=9, bold=True, color="C62828")
        
        current_row += 1

    # 6. Summary Row
    ws.merge_cells(f'A{current_row}:L{current_row}')
    ws.row_dimensions[current_row].height = 25
    summary_cell = ws.cell(row=current_row, column=1)
    summary_cell.value = f"Total Applications Received: {len(processed_data)}"
    summary_cell.fill = PatternFill(start_color=DARK_GREEN, end_color=DARK_GREEN, fill_type="solid")
    summary_cell.font = Font(name='Arial', size=10, bold=True, color=WHITE)
    summary_cell.alignment = Alignment(horizontal='center', vertical='center')

    # 7. Footer Row
    current_row += 2
    ws.merge_cells(f'A{current_row}:L{current_row}')
    footer_cell = ws.cell(row=current_row, column=1)
    footer_cell.value = "This is a computer-generated report from the S.K. Degree College online admission portal. For queries, contact the college administration."
    footer_cell.font = Font(name='Arial', size=8, italic=True, color=GREY)
    footer_cell.alignment = Alignment(horizontal='center', vertical='center')

    # 8. Insert Logo
    if os.path.exists(logo_path):
        img = PILImage.open(logo_path)
        img.thumbnail((150, 75)) # Resizing with aspect ratio
        img.save('temp_logo.png')
        xl_img = Image('temp_logo.png')
        ws.add_image(xl_img, 'A1')
    
    # 9. Settings
    ws.freeze_panes = 'A9'
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.page_setup.orientation = ws.ORIENTATION_LANDSCAPE
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 0
    ws.print_title_rows = '1:8'

    wb.save(output_file)
    if os.path.exists('temp_logo.png'): os.remove('temp_logo.png')
    print(f"Successfully generated perfect report: {output_file}")

if __name__ == "__main__":
    generate_perfect_report()
