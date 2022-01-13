export const fetcher = (...args) => fetch(...args).then((res) => res.json());

// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
export const dateFormat = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);

  const differTime = date.getTime() - now.getTime();
  const differDays = differTime / (1000 * 3600 * 24);
  const countDays = parseInt(differDays, 10);

  const fulldate = date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    fulldate,
    countDays: countDays < 1 ? `Today` : `H -${countDays}`,
  };
};
