import { ModelWebsite } from "container/models";
import {
  websiteDeleteIdAsync,
  websiteGetIdAsync,
  getWebsiteId
} from "features/website/websiteSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const WebsiteDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actor = useSelector(getWebsiteId);
  const [data, setData] = useState(ModelWebsite);
  const { id } = useParams();

  useEffect(() => {
    dispatch(websiteGetIdAsync({ id }));
  }, [id]);

  useEffect(() => {
    const newData = data.map((item) => {
      return { ...item, value: actor[item.name] };
    });
    setData(newData);
  }, [actor]);

  const handleClickDelete = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      if (window.confirm("Confirm deletion")) {
        dispatch(websiteDeleteIdAsync({ id }));
        navigate('/actor-all')
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="max-w-[300px] w-full m-auto">
          <div className="min-h-[400px] rounded overflow-hidden">
            <img
              src={`${process.env.REACT_APP_DOMAIN_URL}/images/website/${actor.file?.filename}`}
              alt=""
            />
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <Link to={`/website-update/${id}`} className="btn inline-block">
              Update
            </Link>
            <button onClick={handleClickDelete} className="btn inline-block">
              Delete
            </button>
          </div>
        </div>
        <div className="flex-1">
          <table>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="pr-4">{item.label}</td>
                    <td>
                      {item.value?.startsWith("http") ? (
                        <a href={item.value}>{item.value}</a>
                      ) : (
                        item.value
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetailPage;
