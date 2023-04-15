import useSWR from "swr";

const fetcher = async (input) => {
  const res = await fetch(input);
  return await res.json();
};

const PageViews = ({ id }) => {
  const { data } = useSWR(`/api/post_views/${id}`, fetcher);

  return <>{data?.total ? `${data.total}` : `–––`}</>;
};

export default PageViews;
