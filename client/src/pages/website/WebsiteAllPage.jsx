import InputField from "components/InputField";
import Pagination from "components/Paginate";
import {
  websiteGetAllAsync,
  getWebsiteAll,
  getWebsiteTotal,
} from "features/website/websiteSlice";
import WebsiteList from "features/website/WebsiteList";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

const WebsiteAllPage = () => {
  const dispatch = useDispatch();
  const websiteList = useSelector(getWebsiteAll);
  const total_row = useSelector(getWebsiteTotal);

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
    dispatch(websiteGetAllAsync({ searchParams }));
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
          <Link to={"/website-add"} className="btn">
            Website Add
          </Link>
        </div>
      </div>
      <WebsiteList dattaList={websiteList} />
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

export default WebsiteAllPage;
