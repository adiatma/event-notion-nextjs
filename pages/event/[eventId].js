import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function renderBlock(block) {
  switch (block.type) {
    case "paragraph":
      return <p>{block?.paragraph?.text[0]?.plain_text}</p>;
    case "heading_2":
      return <h2>{block?.heading_2?.text[0]?.plain_text}</h2>;
    case "numbered_list_item":
      return (
        <ol>
          <li>{block?.numbered_list_item?.text[0]?.plain_text}</li>
        </ol>
      );
    case "bulleted_list_item":
      return (
        <ul>
          <li>{block?.bulleted_list_item?.text[0]?.plain_text}</li>
        </ul>
      );
    case "code":
      return <pre>{block?.code?.text[0]?.plain_text}</pre>;
    default:
      return null;
  }
}

export default function Event() {
  const router = useRouter();
  const { eventId } = router.query;

  const { data: pages, error: errorPages } = useSWR(`/api/pages/${eventId}`, fetcher);
  const { data: blocks, error: errorBlocks } = useSWR(`/api/blocks/${eventId}`, fetcher);

  if (errorBlocks) return <div>{`Oops`}</div>;
  if (errorPages) return <div>{`Oops`}</div>;

  return (
    <div>
      <div>
        <h2>{pages?.properties?.EventName?.title[0]?.plain_text}</h2>
        <>{blocks?.results?.map((block) => renderBlock(block))}</>
      </div>
    </div>
  );
}
