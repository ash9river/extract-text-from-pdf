/* eslint-disable no-loop-func  */
import * as pdfjsLib from "pdfjs-dist/webpack";

const sortRowsByCoordinate = (rows: {
  [y: number]: { x: number; text: string }[];
}) =>
  Object.keys(rows)
    .sort((a, b) => Number(b) - Number(a))
    .map((y) => {
      const row = rows[Number(y)];
      row.sort((a, b) => a.x - b.x);
      return row.map((cell) => cell.text).join(" ");
    });

async function TextFromFile(pdf: pdfjsLib.PDFDocumentProxy) {
  const levelText = "신·구조문대비표";
  let retArray: Array<Array<Array<string>>> = [];
  let tmpRetArray: Array<Array<string>> = [];
  let isLevelTextChecked = false;

  for (let i = 1; i <= pdf.numPages; ++i) {
    let extractFromFile: Array<string> = [];
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();

    const leftRows: { [y: number]: { x: number; text: string }[] } = {};
    const rightRows: { [y: number]: { x: number; text: string }[] } = {};

    textContent.items.forEach((textItem) => {
      if ("str" in textItem) {
        const { str, transform } = textItem;
        const text = str.trim();
        if (!text) return;
        if (text === levelText) {
          isLevelTextChecked = true;
          return;
        }
        if (isLevelTextChecked) {
          const x = transform[4];
          const y = transform[5];
          if (x < 303) {
            if (!leftRows[y]) leftRows[y] = [];
            leftRows[y].push({ x, text });
          } else {
            if (!rightRows[y]) rightRows[y] = [];
            rightRows[y].push({ x, text });
          }
        } else extractFromFile.push(textItem.str);
      }
    });

    let tmpResultData: Array<string> = [];
    if (isLevelTextChecked && tmpRetArray.length === 0) {
      const sortedLeftRows = sortRowsByCoordinate(leftRows);
      const sortedRightRows = sortRowsByCoordinate(rightRows);
      if (extractFromFile.length > 0) tmpRetArray.push(extractFromFile);
      const tmptmptmp = [sortedLeftRows[0], sortedRightRows[0]];
      tmpRetArray.push(tmptmptmp);
      const tmpLeftRow = sortedLeftRows.splice(1).join();
      const tmpRightRow = sortedRightRows.splice(1).join();
      tmpResultData.push(tmpLeftRow, tmpRightRow);
      tmpRetArray.push(tmpResultData);
    } else if (isLevelTextChecked) {
      const sortedLeftRows = sortRowsByCoordinate(leftRows);
      const sortedRightRows = sortRowsByCoordinate(rightRows);
      tmpRetArray.push([sortedLeftRows.join(), sortedRightRows.join()]);
    } else {
      if (!retArray[0]) retArray[0] = [];
      retArray[0].push(extractFromFile);
    }
  }
  retArray.push(tmpRetArray);
  return retArray;
}

export default TextFromFile;
