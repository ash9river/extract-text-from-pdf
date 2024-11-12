import FileLoader from "./FileLoader";
import FileViwer from "./FileViewer";

function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <FileLoader />
      <FileViwer />
    </div>
  );
}

export default Home;
