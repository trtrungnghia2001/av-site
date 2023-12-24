import React, { useState, useEffect, useCallback } from "react";
import imageUpload from "assets/images/upload.png";
import PropTypes from "prop-types";

// UploadImageAndPreview.propTypes = {
//   setValue: PropTypes.func,
//   value: PropTypes.string,
//   name: PropTypes.string
// }

const UploadImageAndPreview = ({ name, setValue = () => {}, value }) => {
  const [file, setFile] = useState();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file);
    };
  }, [file]);

  useEffect(() => {
    setValue(file);
  }, [file]);

  const handleUpload = useCallback(
    (e) => {
      setFile(e.target.files[0]);
      setToggle(false);
    },
    [file]
  );

  useEffect(() => {
    if (value) setToggle(true);
  }, [value]);

  return (
    <div className="flex flex-col gap-1 max-w-max">
      <div className="max-w-[200px] w-full">
        {toggle ? (
          <img src={value} alt="" />
        ) : (
          <img src={file ? URL.createObjectURL(file) : imageUpload} alt="" />
        )}
      </div>
      <input type="file" name={name} id={name} onChange={handleUpload} />
    </div>
  );
};

export default UploadImageAndPreview;
