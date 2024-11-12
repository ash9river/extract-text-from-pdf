import { useEffect, useRef, useState } from "react";
import useFileStore from "../store/useFileStore";
import * as pdfjsLib from "pdfjs-dist/webpack";
import TextFromFile from "./TextFromFile";

pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/build/pdf.worker.mjs`;

function FileViwer() {
  const fileData = useFileStore((state) => state.fileData);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);

  useEffect(() => {
    if (fileData) {
      const loadPdf = async () => {
        const pdf = await pdfjsLib.getDocument({ data: fileData }).promise;
        setPdfDoc(pdf);
        renderPage(pdf, 1);
        const tmptmpArray = await TextFromFile(pdf);
        console.log(tmptmpArray);
      };
      loadPdf();
    }
  }, [fileData]);

  const renderPage = async (
    pdfDoc: pdfjsLib.PDFDocumentProxy,
    pageNumber: number
  ) => {
    const page = await pdfDoc.getPage(pageNumber);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const viewport = page.getViewport({ scale: 3 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    page.render(renderContext);
  };

  return (
    <>
      <canvas ref={canvasRef} />
      {pdfDoc && (
        <>
          <div
            style={{
              display: "flex",
              gap: "10px",
              margin: "auto",
            }}
          >
            {Array.from({ length: pdfDoc.numPages }, (_, index) => (
              <button key={index} onClick={() => renderPage(pdfDoc, index + 1)}>
                Page {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default FileViwer;
