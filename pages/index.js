import useSWR from "swr";
import { fetcher, dateFormat } from "../utils/utils";
import Loader from "../components/Loader";

export default () => {
  const { data, error } = useSWR("/api/database", fetcher);

  // @TODO create error component
  if (error) return <div />;
  if (!data) return <Loader />;

  return (
    <div className="container mx-auto p-10">
      <div className="md:masonry-2-col lg:masonry-3-col box-border mx-auto before:box-inherit after:box-inherit">
        {data?.map((database) => (
          <a key={database?.id} href={`/event/${database.id}`}>
            <div className="break-inside my-6 shadow-xl rounded-lg">
              <img
                className="max-w-full h-auto rounded-lg"
                src={database?.properties?.Cover?.files[0]?.file?.url}
                alt={database?.properties?.Cover?.files[0]?.file?.url}
              />
              <div className="px-6 py-4">
                <div className="text-white inline-block bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                  {dateFormat(database?.properties?.EventDate?.date?.start)?.fulldate}
                </div>
                <div
                  className={`text-white inline-block bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2`}
                >
                  {dateFormat(database?.properties?.EventDate?.date?.start)?.countDays}
                </div>
                <p className="font-bold text-xl mb-2">
                  {database?.properties?.EventName?.title[0]?.text?.content}
                </p>
                <div className="flex items-center mt-8">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src="https://avatars.githubusercontent.com/u/45222198?v=4"
                    alt="Avatar of Jonathan Reinink"
                  />
                  <div className="text-sm">
                    <p className="text-gray-900 leading-none">
                      {database?.properties?.Speaker?.people[0]?.name}
                    </p>
                    <p className="text-gray-600">Speaker</p>
                  </div>
                </div>
              </div>
              <div className="px-6 pt-4 pb-2">
                {database?.properties?.EventCategory?.multi_select?.map((tag) => (
                  <span
                    key={tag?.name}
                    className={`text-white inline-block bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2`}
                  >{`#${tag?.name} `}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
