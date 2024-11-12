declare module "pdfjs-dist/webpack" {
  export * from "pdfjs-dist";
}

declare module "pdfjs-dist/build/pdf.worker.entry" {
  const pdfjsWorker: string;
  export default pdfjsWorker;
}
