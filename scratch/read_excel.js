const XLSX = require('xlsx');
const path = require('path');

try {
    const filePath = 'c:\\Users\\janak\\Downloads\\_Projects\\SK degree college\\project docs\\Student_Inquiries_SK_College.xlsx';
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    console.table(data);
} catch (err) {
    console.error('Error reading Excel:', err.message);
}
