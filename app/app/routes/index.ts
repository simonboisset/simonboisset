import { LoaderFunction, redirect } from 'remix';

export const loader: LoaderFunction = async ({ params }) => {
  const lang = params.lang;
  if (!lang) {
    return redirect('/fr');
  }
};
