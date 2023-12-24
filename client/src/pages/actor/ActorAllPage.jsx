import InputField from "components/InputField";
import Pagination from "components/Paginate";
import Select from "components/Select";
import { countryList } from "container/commons";
import ActorList from "features/actor/ActorList";
import {
  actorGetAllAsync,
  getActorAll,
  getActorTotal,
} from "features/actor/actorSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

const ActorAllPage = () => {
  const dispatch = useDispatch();
  const actorList = useSelector(getActorAll);
  const total_row = useSelector(getActorTotal);

  const [searchParams, setSearchParams] = useSearchParams({
    search_name: "",
    filter_country: "all",
    page: 1,
    limit: 60,
  });

  const search_name = searchParams.get("search_name");
  const filter_country = searchParams.get("filter_country");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  useEffect(() => {
    dispatch(actorGetAllAsync({ searchParams }));
  }, [searchParams]);

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <InputField
          className=""
          placeholder="Search name..."
          value={search_name}
          onChange={(e) =>
            setSearchParams(
              (prev) => {
                prev.set("search_name", e.target.value);
                return prev;
              },
              { replace: true }
            )
          }
        />
        <div className="flex gap-4 items-center">
          <Select
            dataList={countryList}
            value={filter_country}
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  prev.set("filter_country", e.target.value);
                  return prev;
                },
                { replace: true }
              )
            }
          />
          <Link to={"/actor-add"} className="btn">
            Actor Add
          </Link>
        </div>
      </div>
      <ActorList dattaList={actorList} />
      {total_row > 0 && (
        <Pagination
          totalPage={Math.ceil(total_row / limit)}
          currentPage={page}
          onChange={(e) =>
            setSearchParams(
              (prev) => {
                prev.set("page", e.selected + 1);
                return prev;
              },
              { replace: true }
            )
          }
        />
      )}
    </div>
  );
};

export default ActorAllPage;
