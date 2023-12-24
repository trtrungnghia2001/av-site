import React, { useEffect, useState } from "react";
import { ModelActor } from "../../container/models";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import UploadImageAndPreview from "../../components/UploadImageAndPreview ";
import { useDispatch, useSelector } from "react-redux";
import { actorGetIdAsync, actorUpdateIdAsync, getActorId } from "./actorSlice";
import { useParams } from "react-router-dom";
import Select from "components/Select";
import { countryList } from "container/commons";

const ActorFormUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const actor = useSelector(getActorId);
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

  useEffect(() => {
    const newData = data.map((item) => {
      return { ...item, value: actor[item.name] };
    });
    setData(newData);
  }, [actor]);

  useEffect(() => {
    dispatch(actorGetIdAsync({ id }));
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    data.forEach((item) => {
      formData.append(item.name, item.value?.trim());
    });
    formData.append("file", file);
    formData.append("description", description);
    dispatch(actorUpdateIdAsync({ id, data: formData }));
  };

  return (
    <div>
      <h4 className="mb-4 text-center text-[--textSoftColor]">
        Form Actor Update
      </h4>
      <form action="" method="post" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <UploadImageAndPreview
            name={"file"}
            setValue={setFile}
            value={`${process.env.REACT_APP_DOMAIN_URL}/images/actor/${actor.file?.filename}`}
          />
          {data.map((item, index) => {
            return item.type === "select" ? (
              <Select
                key={index}
                label={item.label}
                name={item.name}
                required={item.required}
                value={item.value || ""}
                onChange={handleInput}
                dataList={countryList}
              />
            ) : (
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

export default ActorFormUpdate;
