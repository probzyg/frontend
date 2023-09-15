import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const downloadPDF = async (iframeRef: React.RefObject<any>) => {
  const iframe = iframeRef.current as any;
  if (!iframe) return;

  const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

  if (!iframeDocument) {
    console.error("Failed to access iframe's content document");
    return;
  }

  const scale = 3;
  const canvas = await html2canvas(iframeDocument.body, {
    scale: scale,
    useCORS: true
  });
  const pdf = new jsPDF();
  const imgData = canvas.toDataURL('image/jpeg', 1.0);
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('cv.pdf');
};

export default downloadPDF;
