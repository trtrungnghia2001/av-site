import React, { useState } from "react";
import { ModelActor } from "../../container/models";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import UploadImageAndPreview from "../../components/UploadImageAndPreview ";
import { useDispatch } from "react-redux";
import { actorAddOneAsync } from "./actorSlice";
import TextEditer from "components/TextEditer";
import Select from "components/Select";
import { countryList } from "container/commons";

const ActorFormAdd = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(ModelActor);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("")

  const handleInput = (e) => {
    const newData = data.map((item) => {
      return item.name === e.target.name
        ? { ...item, value: e.target.value }
        : item;
    });

    setData(newData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    data.forEach((item) => {
      formData.append(item.name, item.value?.trim());
    });
    formData.append("file", file);
    formData.append("description", description);
    dispatch(actorAddOneAsync({ data: formData }));
  };

  return (
    <div>
      <h4 className="mb-4 text-center text-[--textSoftColor]">
        Form Actor Add
      </h4>
      <form action="" method="post" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <UploadImageAndPreview
            name={"file"}
            setValue={setFile}
            
          />
          {data.map((item, index) => {
            return (
              item.type === 'select'?
              <Select key={index} label={item.label} name={item.name}
              required={item.required}
              value={item.value || ""}
              onChange={handleInput}
              dataList={countryList}
              />
              :
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

          <TextEditer data={description} setData={setDescription}/>

          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default ActorFormAdd;
