import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService, Employee } from '../employee.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportExcel } from 'devextreme/excel_exporter';
import { exportDataGrid as exportPdf } from 'devextreme/pdf_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import notify from 'devextreme/ui/notify';


@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.css',
})
export class DatagridComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  employees: Employee[] = [];
  departmentList: string[] = ['IT', 'Design', 'Sales'];
  positionList: string[] = ['Developer', 'Designer', 'Manager'];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  onRowUpdating(e: any) {
    const oldData = { ...e.oldData };
    const newData = { ...oldData, ...e.newData };
    this.employeeService.updateEmployee(newData);
    notify('ข้อมูลถูกอัพเดทเรียบร้อยแล้ว', 'success', 3000);
  }

  onRowInserting(e: any) {
    const newData = { ...e.data };
    this.employeeService.insertEmployee(newData);
    notify('เพิ่มข้อมูลเรียบร้อยแล้ว', 'success', 3000);
  }

  onRowRemoving(e: any) {
    this.employeeService.deleteEmployee(e.data.id);
    notify('ลบข้อมูลเรียบร้อยแล้ว', 'success', 3000);
  }

  showSelectColumnChooser(): void {
      this.dataGrid.instance.showColumnChooser();
  }

  async exportToExcel(selectedOnly: boolean): Promise<void> {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Employees');
    
    const titleRow = worksheet.addRow(['ข้อมูลพนักงาน']);
    titleRow.font = { name: 'Arial', size: 16, bold: true };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('A1:E1'); 
    worksheet.addRow([]);

    const imagePromises: Promise<void>[] = [];
    
    await exportExcel({
      component: this.dataGrid.instance,
      worksheet: worksheet,
      autoFilterEnabled: true,
      selectedRowsOnly: selectedOnly,
      topLeftCell: { row: 3, column: 1 },
      customizeCell: ({ gridCell, excelCell }) => {
        if (gridCell?.rowType === 'header') {
          excelCell.font = { bold: true, size: 12 };
          excelCell.alignment = { horizontal: 'center', vertical: 'middle' };
        }
        
        if (gridCell?.column?.dataField === 'salary') {
          excelCell.numFmt = '฿#,##0.00';
        }

        if (gridCell?.column?.dataField === 'picture' && gridCell.value) {
          const rowIndex = excelCell.row - 1; 
          const imagePromise = fetch(gridCell.value)
            .then(response => response.arrayBuffer())
            .then(buffer => {
              const imageId = workbook.addImage({
                buffer,
                extension: 'png',
              });

              worksheet.addImage(imageId, {
                tl: { col: excelCell.col - 1, row: rowIndex - 0 },
                ext: { width: 50, height: 50 }
              });
            })
            .catch(() => {
              console.log('Failed to load image:', gridCell.value);
            });

          imagePromises.push(imagePromise);
        }
      }
    });

    await Promise.all(imagePromises);

    worksheet.columns.forEach((column, index) => {
      if (index === 0) { 
        column.width = 15;
      } else {
        column.width = 20;
      }
    });

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 3) { 
        row.height = 40;
      }
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'EmployeeData.xlsx');
    });
  }            

  exportToPdf(selectedOnly: boolean): void {
    const doc = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'a4'
    });
    
    doc.setFont('THSarabunNew');
    doc.setFontSize(16);
    doc.text('ข้อมูลพนักงาน', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    exportPdf({
      component: this.dataGrid.instance,
      jsPDFDocument: doc,
      selectedRowsOnly: selectedOnly,
      margin: { top: 30 }
    }).then(() => {
      doc.save('EmployeeData.pdf');
    });
  }
}