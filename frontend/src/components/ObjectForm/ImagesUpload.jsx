import { useState } from "react";
import { ButtonDefault } from "../ButtonDefault/ButtonDefault";
import imagesUpload from "./imagesUpload.module.sass";

export const ImagesUpload = ({ files, setFiles }) => {
  const [selectedfile, SetSelectedFile] = useState([]);
  const InputChange = (e) => {
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];
      if (file.size > 1048576) {
        alert("Размер файла не должен превышать 1mb");
        continue; // пропустить файл
      }

      // create a preview of the image
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        SetSelectedFile((preValue) => {
          return [
            ...preValue,
            {
              image: file,
              preview: reader.result, // add the preview image to the state
            },
          ];
        });
      };

      images.push(file);
    }
  };

  const FileUploadSubmit = async (e) => {
    e.preventDefault();
    if (selectedfile.length > 0) {
      for (let index = 0; index < selectedfile.length; index++) {
        setFiles((preValue) => {
          return [...preValue, selectedfile[index]];
        });
      }
      SetSelectedFile([]);
    } else {
      alert("Please select file");
    }
  };

  const handleDelete = (index, e) => {
    e.preventDefault();
    const newSelectedFile = [...selectedfile];
    newSelectedFile.splice(index, 1);
    SetSelectedFile(newSelectedFile);
  };

  const handleDeleteFiles = (index, e) => {
    e.preventDefault();
    const newSelectedFile = [...files];
    newSelectedFile.splice(index, 1);
    setFiles(newSelectedFile);
  };

  return (
    <div className={imagesUpload.section}>
      <div className={imagesUpload.uploadBox}>
        <input
          type="file"
          id="fileupload"
          className={imagesUpload.input}
          onChange={InputChange}
          multiple
        />
        <span>
          Перетащите или{" "}
          <span className={imagesUpload.link}>выберите фотографии</span>
        </span>
      </div>
      {selectedfile.length ? (
        <div className={imagesUpload.previewWrap}>
          {selectedfile.map((data, index) => {
            return (
              <div key={index} className={imagesUpload.imgWrap}>
                <img
                  key={index}
                  src={data.preview}
                  className={imagesUpload.preview}
                />
                <button
                  className={imagesUpload.removeBtn}
                  onClick={(e) => handleDelete(index, e)}
                >
                  Удалить
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      <div className={imagesUpload.textWrapper}>
        <p className={imagesUpload.text}>{selectedfile.length} выбранно</p>
        <p
          className={
            files.length == 0 ? imagesUpload.textError : imagesUpload.text
          }
        >
          {" "}
          {files.length} загруженно
        </p>
      </div>

      <div className={imagesUpload.btnWrapper}>
        <ButtonDefault
          lable="Загрузить выбранные фото"
          action={FileUploadSubmit}
        />
      </div>
      {files.length ? (
        <div className={imagesUpload.previewWrap}>
          {files.map((data, index) => {
            return (
              <div key={index} className={imagesUpload.imgWrap}>
                <img
                  key={index}
                  src={data.preview}
                  className={imagesUpload.preview}
                />
                <button
                  className={imagesUpload.removeBtn}
                  onClick={(e) => handleDeleteFiles(index, e)}
                >
                  Удалить
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
