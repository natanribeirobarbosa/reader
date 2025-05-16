const url = 'livros/ProgramacaoParaWeb.pdf';
const STORAGE_KEY = 'pagina_atual';

let pdfDoc = null;
let currentPage = parseInt(localStorage.getItem(STORAGE_KEY)) || 1;
const pdfText = document.getElementById('pdf-text');
const pageInfo = document.getElementById('page-info');

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

function renderPage(num) {
  pdfDoc.getPage(num).then(page => {
    return page.getTextContent();
  }).then(textContent => {
    const textItems = textContent.items.map(item => item.str).join(' ');
    pdfText.innerText = textItems;
    pageInfo.innerText = `Página ${currentPage} de ${pdfDoc.numPages}`;
    localStorage.setItem(STORAGE_KEY, currentPage);
  });
}

pdfjsLib.getDocument(url).promise.then(pdf => {
  pdfDoc = pdf;
  renderPage(currentPage);
});

document.getElementById('prev').addEventListener('click', () => {
  if (currentPage <= 1) return;
  currentPage--;
  renderPage(currentPage);
});

document.getElementById('next').addEventListener('click', () => {
  if (currentPage >= pdfDoc.numPages) return;
  currentPage++;
  renderPage(currentPage);
});
