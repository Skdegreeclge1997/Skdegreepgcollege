import ExcelJS from 'exceljs';
import { COLLEGE_LOGO_BASE64 } from '@/lib/logo-base64';
import { Inquiry } from '@/lib/types';

export const exportInquiriesToExcel = async (inquiries: Inquiry[]) => {
  try {
    // ── Color Palette ──
    const DARK_GREEN  = "1B5E20";
    const MED_GREEN   = "2E7D32";
    const LIGHT_GREEN = "E8F5E9";
    const HDR_GREEN   = "388E3C";
    const GOLD        = "F9A825";
    const ROW_ALT     = "F1F8E9";
    const GREY_HEX    = "757575";

    const thinBorder: Partial<ExcelJS.Borders> = {
      top:    { style: "thin", color: { argb: "FFCCCCCC" } },
      bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
      left:   { style: "thin", color: { argb: "FFCCCCCC" } },
      right:  { style: "thin", color: { argb: "FFCCCCCC" } },
    };

    const hdrBorder: Partial<ExcelJS.Borders> = {
      top:    { style: "thin", color: { argb: "FF" + MED_GREEN } },
      bottom: { style: "thin", color: { argb: "FF" + MED_GREEN } },
      left:   { style: "thin", color: { argb: "FF" + MED_GREEN } },
      right:  { style: "thin", color: { argb: "FF" + MED_GREEN } },
    };

    // ── Prepare Data ──
    const headers = ["S.No", "Student Name", "Father's Name", "Email", "Phone", "Course Applied", "Group", "Status", "Applied Date", "Address"];
    const totalCols = headers.length; // 10

    const dataRows = inquiries.map((inq, i) => {
      const rawMessage = inq.message || "";
      const parts = rawMessage.includes("|") ? rawMessage.split("|") : [rawMessage];

      const groupVal = parts[0]?.includes("Group:") 
        ? parts[0].replace("Group: ", "").trim() 
        : (inq.course === "Contact Inquiry" ? "N/A" : parts[0]?.trim() || "N/A");

      const addressVal = parts[1]?.includes("Address:") 
        ? parts[1].replace("Address: ", "").trim() 
        : "N/A";

      return [
        i + 1,
        inq.name,
        inq.father_name || "N/A",
        inq.email,
        inq.phone,
        inq.course,
        groupVal,
        inq.status || "New",
        new Date(inq.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" }),
        addressVal,
      ];
    });

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) + " | " + now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

    // ── Create Workbook ──
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("Admission Report", {
      pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
    });

    // ── Column Widths ──
    const colWidths = [5, 22, 20, 28, 14, 30, 12, 12, 22, 40];
    ws.columns = colWidths.map(w => ({ width: w }));

    // ── Helper: fill every cell in a row ──
    const fillRow = (rowNum: number, fill: ExcelJS.Fill, font: Partial<ExcelJS.Font>, alignment?: Partial<ExcelJS.Alignment>) => {
      const row = ws.getRow(rowNum);
      for (let c = 1; c <= totalCols; c++) {
        const cell = row.getCell(c);
        cell.fill = fill;
        cell.font = font as ExcelJS.Font;
        if (alignment) cell.alignment = alignment as ExcelJS.Alignment;
      }
    };

    const solidFill = (color: string): ExcelJS.Fill => ({
      type: "pattern", pattern: "solid", fgColor: { argb: "FF" + color },
    });

    // ── ROW 1: Logo + College Name ──
    ws.getRow(1).height = 55;
    ws.mergeCells("A1:J1");
    fillRow(1, solidFill(DARK_GREEN),
      { name: "Arial", size: 20, bold: true, color: { argb: "FFFFFFFF" } },
      { horizontal: "center", vertical: "middle" }
    );
    ws.getCell("A1").value = "S.K. DEGREE COLLEGE & PG COLLEGE";

    // Insert logo image at column D (index 3)
    const logoId = wb.addImage({ base64: COLLEGE_LOGO_BASE64, extension: "jpeg" });
    ws.addImage(logoId, {
      tl: { col: 3, row: 0 },
      ext: { width: 70, height: 50 },
    });

    // ── ROW 2: Affiliation ──
    ws.getRow(2).height = 22;
    ws.mergeCells("A2:J2");
    fillRow(2, solidFill(MED_GREEN),
      { name: "Arial", size: 12, bold: true, color: { argb: "FFFFFFFF" } },
      { horizontal: "center", vertical: "middle" }
    );
    ws.getCell("A2").value = "Affiliated to Andhra University | Established in 1997";

    // ── ROW 3: Contact (Address row removed) ──
    ws.getRow(3).height = 16;
    ws.mergeCells("A3:J3");
    ws.getCell("A3").value = "Ph: 94412 53163 | Email: arunodayaes@yahoo.com | www.skdegreecollege.com";
    ws.getCell("A3").font = { name: "Arial", size: 9, italic: true, color: { argb: "FF" + GREY_HEX } };
    ws.getCell("A3").alignment = { horizontal: "center", vertical: "middle" };

    // ── ROW 4: Gold divider ──
    ws.getRow(4).height = 8;
    ws.mergeCells("A4:J4");
    fillRow(4, solidFill(GOLD), {}, {});

    // ── ROW 5: Report title ──
    ws.getRow(5).height = 24;
    ws.mergeCells("A5:J5");
    fillRow(5, solidFill(LIGHT_GREEN),
      { name: "Arial", size: 13, bold: true, color: { argb: "FF" + DARK_GREEN } },
      { horizontal: "center", vertical: "middle" }
    );
    ws.getCell("A5").value = "ONLINE APPLICATION LIST \u2013 ADMISSIONS 2026-27";

    // ── ROW 6: Date/Time ──
    ws.getRow(6).height = 16;
    ws.mergeCells("A6:J6");
    ws.getCell("A6").value = `Date of Printing: ${dateStr}`;
    ws.getCell("A6").font = { name: "Arial", size: 9, italic: true, color: { argb: "FF" + GREY_HEX } };
    ws.getCell("A6").alignment = { horizontal: "right", vertical: "middle" };

    // ── ROW 7: Column Headers ──
    ws.getRow(7).height = 30;
    const headerRow = ws.getRow(7);
    headers.forEach((h, i) => {
      const cell = headerRow.getCell(i + 1);
      cell.value = h;
      cell.fill = solidFill(HDR_GREEN);
      cell.font = { name: "Arial", size: 10, bold: true, color: { argb: "FFFFFFFF" } };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = hdrBorder;
    });

    // ── DATA ROWS ──
    const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
      "New":       { bg: "E3F2FD", fg: "1565C0" },
      "Contacted": { bg: "FFF3E0", fg: "E65100" },
      "Confirmed": { bg: "E8F5E9", fg: "2E7D32" },
      "Processed": { bg: "E8F5E9", fg: "2E7D32" },
      "Rejected":  { bg: "FFEBEE", fg: "C62828" },
    };

    dataRows.forEach((rowData, idx) => {
      const rowNum = 8 + idx;
      const row = ws.getRow(rowNum);
      row.height = 20;
      const isEven = idx % 2 === 1;

      rowData.forEach((val, colIdx) => {
        const cell = row.getCell(colIdx + 1);
        cell.value = val;
        cell.font = { name: "Arial", size: 9 };
        cell.alignment = { vertical: "middle", wrapText: colIdx === 9 };
        cell.border = thinBorder;

        if (isEven) {
          cell.fill = solidFill(ROW_ALT);
        }

        // Status badge (column index 7)
        if (colIdx === 7) {
          const sc = STATUS_COLORS[String(val)];
          if (sc) {
            cell.fill = solidFill(sc.bg);
            cell.font = { name: "Arial", size: 9, bold: true, color: { argb: "FF" + sc.fg } };
            cell.alignment = { horizontal: "center", vertical: "middle" };
          }
        }
      });
    });

    // ── SUMMARY ROW ──
    const summaryRowNum = 8 + dataRows.length;
    ws.mergeCells(`A${summaryRowNum}:J${summaryRowNum}`);
    ws.getRow(summaryRowNum).height = 25;
    fillRow(summaryRowNum, solidFill(DARK_GREEN),
      { name: "Arial", size: 10, bold: true, color: { argb: "FFFFFFFF" } },
      { horizontal: "center", vertical: "middle" }
    );
    ws.getCell(`A${summaryRowNum}`).value = `Total Applications Received: ${dataRows.length}`;

    // ── FOOTER ROW ──
    const footerRowNum = summaryRowNum + 2;
    ws.mergeCells(`A${footerRowNum}:J${footerRowNum}`);
    ws.getCell(`A${footerRowNum}`).value = "This is a computer-generated report from the S.K. Degree College online admission portal. For queries, contact the college administration.";
    ws.getCell(`A${footerRowNum}`).font = { name: "Arial", size: 8, italic: true, color: { argb: "FF" + GREY_HEX } };
    ws.getCell(`A${footerRowNum}`).alignment = { horizontal: "center", vertical: "middle" };

    // ── FREEZE PANES ──
    ws.views = [{ state: "frozen", ySplit: 7 }];

    // ── PRINT TITLE ROWS ──
    ws.pageSetup.printTitlesRow = "1:7";

    // ── DOWNLOAD ──
    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SK_College_Admission_Report_${now.getFullYear()}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Excel export failed:", error);
    alert("Failed to export Excel report. Please try again.");
  }
};
