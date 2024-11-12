import { ChangeEvent } from "react";
import useFileStore from "../store/useFileStore";

function FileLoader() {
  const setFileData = useFileStore((state) => state.setFileData);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) {
      alert("파일이 존재하지 않습니다.");
      return;
    }

    const fileType = file.type;
    if (!fileType.includes("pdf")) {
      alert("해당 파일 타입은 pdf가 아닙니다.");
      return;
    }

    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file);

    fileReader.onload = () => {
      const { result } = fileReader;

      setFileData(result);
    };
  }

  return <input type="file" accept=".pdf" onChange={(e) => handleChange(e)} />;
}

export default FileLoader;
