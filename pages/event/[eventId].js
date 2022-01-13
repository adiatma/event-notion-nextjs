import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher, dateFormat } from "../../utils/utils";
import Loader from "../../components/Loader";

/**
 * @param {Object} props.block
 */
const renderBlock = (block) => {
  switch (block.type) {
    case "paragraph":
      return block?.paragraph?.text.length === 0 ? (
        <br />
      ) : (
        <p
          className={`${block?.paragraph?.text[0]?.annotations?.bold ? `font-bold` : `font-light`}`}
        >
          {block?.paragraph?.text[0]?.plain_text}
        </p>
      );
    case "heading_1":
      return <p className="text-xl">{block?.heading_1.text[0]?.plain_text}</p>;
    case "heading_2":
      return <p className="text-xl">{block?.heading_2.text[0]?.plain_text}</p>;
    case "heading_3":
      return <p className="text-xl">{block?.heading_3.text[0]?.plain_text}</p>;
    case "numbered_list_item":
    case "bulleted_list_item":
      return <li className="list-inside">{block?.bulleted_list_item?.text[0]?.plain_text}</li>;
    case "code":
      return (
        <pre>
          <code>{block?.code?.text[0]?.plain_text}</code>
        </pre>
      );
    case "image":
      return (
        <img
          className="max-w-full h-auto rounded-lg"
          src={block?.image?.external?.url}
          alt={block?.image?.external?.url}
        />
      );
    default:
      return <div />;
  }
};

export default () => {
  const router = useRouter();
  const { eventId } = router.query;

  const { data: page, error: errorPage } = useSWR(`/api/page/${eventId}`, fetcher);
  const { data: blocks, error: errorBlocks } = useSWR(`/api/blocks/${eventId}`, fetcher);

  // @TODO create error component
  if (errorBlocks) return <div />;
  if (errorPage) return <div />;

  if (!page) return <Loader />;
  if (!blocks) return <Loader />;

  return (
    <div className="container mx-auto xl:w-1/2 md:w-auto">
      <div className="rounded overflow-hidden shadow-lg p-5">
        <img
          className="max-w-full h-auto rounded-lg"
          src={page?.properties?.Cover?.files[0]?.file?.url}
          alt={page?.properties?.Cover?.files[0]?.file?.url}
        />
        <div className="px-2 py-2">
          <p className="font-bold text-xl mb-2">
            {page?.properties?.EventName?.title[0]?.plain_text}
          </p>
          <div className="text-white inline-block bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
            {dateFormat(page?.properties?.EventDate?.date?.start)?.fulldate}
          </div>
          <div className="text-white inline-block bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
            {dateFormat(page?.properties?.EventDate?.date?.start)?.countDays}
          </div>
          <div className="flex items-center mt-8 mb-8">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src="https://avatars.githubusercontent.com/u/45222198?v=4"
              alt="Adiatma Kamarudin"
            />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">
                {page?.properties?.Speaker?.people[0]?.name}
              </p>
              <p className="text-gray-600">Speaker</p>
            </div>
          </div>
          <div>
            {blocks?.results?.map((block) => (
              <div key={block.id}>{renderBlock(block)}</div>
            ))}
          </div>
        </div>
        <div className="px-4 pt-4 pb-2">
          {page?.properties?.EventCategory?.multi_select?.map((tag) => (
            <span
              key={tag?.id}
              className="text-white inline-block bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
            >{`#${tag?.name} `}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
