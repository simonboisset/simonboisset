import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ArticleContent, processedContent } from "~/components/content/article";
import { ContentLayout } from "~/components/content/layout";
import { requireDocument } from "~/contents/documents/document.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { document } = requireDocument(params);
  const { content, toc, title, description } = await processedContent(document);
  return { content, toc, title, description };
};

export default function Index() {
  const { content, toc, title, description } = useLoaderData<typeof loader>();
  return (
    <ContentLayout>
      <ArticleContent
        description={description}
        content={content}
        toc={toc}
        title={title}
      />
    </ContentLayout>
  );
}
