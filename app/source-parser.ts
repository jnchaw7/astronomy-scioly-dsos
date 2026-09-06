export type StudySource = { id: string; name: string; text: string; characters: number };

export async function parseStudyFile(file: File): Promise<StudySource> {
  const extension = file.name.split('.').pop()?.toLowerCase();
  let text = '';
  if (extension === 'docx') {
    const mammoth = await import('mammoth/mammoth.browser');
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    text = result.value;
  } else if (extension === 'pdf') {
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url).toString();
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => ('str' in item ? item.str : '')).join(' '));
    }
    text = pages.join('\n');
  } else {
    text = await file.text();
  }
  const cleaned = text.split(String.fromCharCode(0)).join('').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim().slice(0, 60_000);
  return { id: `${file.name}-${file.lastModified}`, name: file.name, text: cleaned, characters: cleaned.length };
}
