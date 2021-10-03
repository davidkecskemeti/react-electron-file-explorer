import { useMemo, useState } from "react";
import "./App.css";
import fsType from "fs";
import pathModuleType from "path";
import FileViewer from "./components/FileViewer";
import { formatSize } from "./utils/FileUtil";
const fs: typeof fsType = window.require("fs");
const pathModule: typeof pathModuleType = window.require("path");
const { app } = window.require("@electron/remote");

function App() {
  const [path, setPath] = useState(app.getAppPath());

  const files = useMemo(
    () =>
      fs
        .readdirSync(path)
        .map((file: any) => {
          const stats = fs.statSync(pathModule.join(path, file));
          return {
            name: file,
            size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
            directory: stats.isDirectory(),
          };
        })
        .sort((a: any, b: any) => {
          if (a.directory === b.directory) {
            return a.name.localeCompare(b.name);
          }
          return a.directory ? -1 : 1;
        }),
    [path]
  );

  const onBack = () => setPath(pathModule.dirname(path));
  const onOpen = (folder: any) => setPath(pathModule.join(path, folder));
  const [search, setSearch] = useState<string>("");
  const filteredFiles = files.filter((file: any) =>
    file.name.startsWith(search)
  );
  return (
    <div className="container mt-2">
      <h4>{path}</h4>
      <div className="form-group mt-4 mb-2">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="form-control form-control-sm"
          placeholder="File search"
        />
      </div>
      <FileViewer files={filteredFiles} onBack={onBack} onOpen={onOpen} />
    </div>
  );
}

export default App;
