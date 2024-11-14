// src/app/fonts.ts
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// กำหนดค่าเริ่มต้นของ virtual font storage
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// แปลง font เป็น base64
const THSarabunBase64 = ''; // ใส่ base64 ของ font ตรงนี้

// กำหนด font
pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew',
    bold: 'THSarabunNew',
    italics: 'THSarabunNew',
    bolditalics: 'THSarabunNew'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
};

// เพิ่ม font ไทยเข้าไปใน virtual font storage
pdfMake.vfs['THSarabunNew'] = THSarabunBase64;

export default pdfMake;