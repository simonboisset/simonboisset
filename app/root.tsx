import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

export const loader = async (args: LoaderFunctionArgs) => {
  const domain = args.request.headers.get("host") || "";
  if (domain === "simonboisset.com") {
    const urlWithoutHost = args.request.url.split("/").slice(3);
    throw redirect(`https://www.simonboisset.com/${urlWithoutHost.join("/")}`, {
      status: 301,
    });
  }

  return {};
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: "Simon Boisset - Software Engineer" },
    {
      name: "description",
      content:
        "I'm a software engineer. Expert in React, TypeScript and Node.js.",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
