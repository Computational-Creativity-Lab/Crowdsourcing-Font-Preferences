import Link from "next/link";
import { Fragment } from "react/cjs/react.production.min";

function NewsPage() {
  return (
    <Fragment>
      <h1>News Page</h1>
      <Link href="/news/next-js-blah">Link test</Link>
    </Fragment>
  );
}

export default NewsPage;
