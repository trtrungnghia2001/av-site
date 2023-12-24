import React, { useEffect, useState } from "react";
import { ModelWebsite } from "../../container/models";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import UploadImageAndPreview from "../../components/UploadImageAndPreview ";
import { useDispatch, useSelector } from "react-redux";
import { getWebsiteId, websiteGetIdAsync, websiteUpdateIdAsync } from "./websiteSlice";
import { useParams } from "react-router-dom";

const WebsiteFormUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const website = useSelector(getWebsiteId);
  const [data, setData] = useState(ModelWebsite);
  const [file, setFile] = useState(null);

  const handleInput = (e) => {
    const newData = data.map((item) => {
      return item.name === e.target.name
        ? { ...item, value: e.target.value }
        : item;
    });

    setData(newData);
  };

  useEffect(() => {
    const newData = data.map((item) => {
      return { ...item, value: website[item.name] };
    });
    setData(newData);
  }, [website]);

  useEffect(() => {
    dispatch(websiteGetIdAsync({ id }));
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    data.forEach((item) => {
      formData.append(item.name, item.value?.trim());
    });
    formData.append("file", file);
    dispatch(websiteUpdateIdAsync({ id, data: formData }));
  };

  return (
    <div>
      <h4 className="mb-4 text-center text-[--textSoftColor]">
        Form Website Update
      </h4>
      <form action="" method="post" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <UploadImageAndPreview
            name={"file"}
            setValue={setFile}
            value={`${process.env.REACT_APP_DOMAIN_URL}/images/website/${website.file?.filename}`}
          />
          {data.map((item, index) => {
            return (
              <InputField
                key={index}
                label={item.label}
                name={item.name}
                type={item.type}
                required={item.required}
                value={item.value || ""}
                onChange={handleInput}
              />
            );
          })}

          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default WebsiteFormUpdate;
