import { FC } from "react";
import { FaFolderOpen, FaFolder, FaIcons } from "react-icons/fa";

interface FileViewerProps {
  files: any;
  onBack: Function;
  onOpen: Function;
}

const FileViewer: FC<FileViewerProps> = ({ files, onBack, onOpen }) => {
  return (
    <table className="table">
      <tbody>
        <tr className="clickable" onClick={() => onBack()}>
          <td className="icon-row">
            <FaFolderOpen />
          </td>
          <td>...</td>
          <td></td>
        </tr>
        {files.map(({ name, directory, size }: any) => {
          return (
            <tr className="clickable" onClick={() => directory && onOpen(name)}>
              <td className="icon-row">
                {directory ? <FaFolder /> : <FaIcons />}
              </td>
              <td>{name}</td>
              <td>
                <span className="float-end">{size}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default FileViewer;
