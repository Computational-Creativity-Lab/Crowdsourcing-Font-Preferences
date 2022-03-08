import { useRouter } from "next/router";

function NewsPage() {
  const router = useRouter();
  const newsId = router.query.newsId;

  return <h1>Dynamic News Page</h1>;
}

export default NewsPage;
