import { Link } from "react-router-dom";

const ActorList = ({ dattaList = [] }) => {
  return (
    <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {dattaList.map((item) => {
        return (
          <li
            key={item?._id}
            className="group bg-[--darkColor3] border-[1px] border-[--borderColor] rounded overflow-hidden transition shadow hover:bg-[--darkColor1] hover:shadow-md "
          >
            <Link to={`/actor-id/${item?._id}`}>
              <div>
                <div className="h-[200px] w-full overflow-hidden">
                  <img
                    className="transition group-hover:scale-110"
                    src={`${process.env.REACT_APP_DOMAIN_URL}/images/actor/${item.file?.filename}`}
                    alt=""
                  />
                </div>
                <div className="p-4">
                  <p className="capitalize font-bold">{item.name}</p>
                  <p>{item.name_of_country}</p>
                  <p>
                    {new Date().getFullYear() -
                      new Date(item.birthday).getFullYear() || 0}{" "}
                    year old
                  </p>
                  <p>{item.country}</p>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ActorList;
