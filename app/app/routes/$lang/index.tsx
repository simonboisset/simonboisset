import { Client } from '@notionhq/client';
import { useEffect, useRef, useState } from 'react';
import { Link, LoaderFunction, useLoaderData } from 'remix';
import { Footer, Header } from '~/features';
import { Body, Main } from '~/ui';

type NotionResponse = {
  result:{

  }[]
}

export const loader: LoaderFunction = async () => {
  const notion = new Client({
    auth: 'secret_OQIuYXSUFdR5pilVUjtbXdaXcsNCzh8KlmZxl9xtPZ0',
  });
  const projectsDatabaseId = 'c8b8541d153148869736bb76f1239455';
  const parcoursDatabaseId = '1e7146adb1bf4405a5f518c48bc4170c';
  const notionResponse = (await notion.databases.query({
    database_id: projectsDatabaseId,
  })) as any;
  const parcoursResponse = (await notion.databases.query({
    database_id: parcoursDatabaseId,
  })) as any;

  const realisations = await Promise.all(
    notionResponse.results.map(async ({ properties }: any) => await api.notion.getNotionData(properties)),
  );
  const parcours = await Promise.all(
    parcoursResponse.results.map(async ({ properties }: any) => await api.notion.getNotionData(properties)),
  );

  return { realisations, parcours };
};

type Data = {
  realisations: {
    logo: [string];
    github: string;
    link: string;
    description: string;
    stack: string[];
    name: string;
  }[];
  parcours: {
    image: [string];
    year: number;
    link: string;
    description: string;
    title: string;
  }[];
};
export default function Index() {
  const { realisations, parcours } = useLoaderData<Data>();
  const parcoursRef = useRef<HTMLDivElement>(null);
  const [timelinePosition, setTimelinePosition] = useState([0, 0]);

  useEffect(() => {
    const handleResize = () => {
      const body = document.getElementById('main-body');
      setTimelinePosition([
        (parcoursRef.current?.getBoundingClientRect().top || 0) - (body?.getBoundingClientRect().top || 0),
        window.innerHeight -
          (body?.getBoundingClientRect().height || 0) -
          ((parcoursRef.current?.getBoundingClientRect().bottom || 0) - (body?.getBoundingClientRect().bottom || 0)),
      ]);
    };
    handleResize();
    addEventListener('resize', handleResize);
    return () => removeEventListener('resize', handleResize);
  }, []);

  return (
    <Body>
      <Header extended />
      <Main>
        <div className='py-10 flex flex-col items-center space-y-16 bg-opacity-5'>
          <h2 className='font-semibold text-3xl'>Réalisations</h2>
          <div className='flex flex-row space-x-40  justify-center'>
            {realisations.map((data) => (
              <Link
                to={data.link}
                key={data.name}
                className='flex flex-col space-y-2 w-60 items-center hover:bg-slate-100 rounded-xl p-4 transition-all '>
                <img
                  alt={data.name}
                  src={`data:image/png;base64,${data.logo[0]}`}
                  className='h-44 rounded-3xl shadow-lg'
                />

                <div className='flex flex-col space-y-4 items-center text-justify'>
                  <h5 className='font-semibold text-lg'>{data.name}</h5>
                  <span>{data.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className='py-10 flex flex-col items-center space-y-16'>
          <h2 className='font-semibold text-3xl'>Parcours</h2>
          <div ref={parcoursRef} className='flex flex-col space-y-28 w-full max-w-4xl items-center'>
            <div
              className='w-px bg-blue-500 rounded-full absolute z-0'
              style={{ top: timelinePosition[0], bottom: timelinePosition[1] }}
            />
            {parcours
              .sort((a, b) => a.year - b.year)
              .map((data, i) => (
                <div key={data.title} className='w-full flex flex-col items-center space-y-12'>
                  <h4 className='z-10 flex items-center justify-center font-semibold text-lg text-blue-500 border-blue-500 ring-1 ring-blue-500 rounded-full h-16 w-16 bg-white'>
                    {data.year}
                  </h4>
                  {(i + 1) % 2 ? (
                    <div className='flex flex-row w-full justify-between items-center'>
                      <div className='w-80 flex justify-center'>
                        <img
                          alt={data.title}
                          src={`data:image/png;base64,${data.image[0]}`}
                          className='max-w-xs max-h-40 rounded-3xl'
                        />
                      </div>
                      <div className='w-80 flex flex-col space-y-2'>
                        <h3 className='font-semibold text-xl'>{data.title}</h3>
                        <p className='text-justify'>{data.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-row w-full justify-between items-center'>
                      <div className='w-80 flex flex-col space-y-2'>
                        <h3 className='font-semibold text-xl'>{data.title}</h3>
                        <p className='text-justify'>{data.description}</p>
                      </div>
                      <div className='w-80 flex justify-center'>
                        <img
                          alt={data.title}
                          src={`data:image/png;base64,${data.image[0]}`}
                          className='max-w-xs max-h-40 rounded-3xl'
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </Main>
      <Footer />
    </Body>
  );
}
