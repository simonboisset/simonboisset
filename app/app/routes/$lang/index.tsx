import { Client } from '@notionhq/client';
import { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { Footer, Header } from '~/features';
import {
  FilesData,
  MultiSelectData,
  NumberData,
  RichTextData,
  TitleData,
  UrlData,
} from '~/features/blog/types/database';
import { DatabaseResult, QueryDatabaseResponse } from '~/features/blog/types/QueryDatabaseResponse';
import { t } from '~/features/traduction';

type RealisationDatas = {
  logo: FilesData;
  github: UrlData;
  link: UrlData;
  description: RichTextData;
  stack: MultiSelectData;
  name: TitleData;
};

type ParcoursDatas = {
  link: UrlData;
  image: FilesData;
  year: NumberData;
  title: TitleData;
  description: RichTextData;
};

export const loader: LoaderFunction = async ({ params }) => {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  const { lang } = params as { lang: keyof typeof t };
  const achievementsId = t[lang].achievementsId;
  const backgroundId = t[lang].backgroundId;
  const notionResponse = (await notion.databases.query({
    database_id: achievementsId,
  })) as QueryDatabaseResponse<RealisationDatas>;
  const parcoursResponse = (await notion.databases.query({
    database_id: backgroundId,
  })) as QueryDatabaseResponse<ParcoursDatas>;

  return { realisations: notionResponse.results, parcours: parcoursResponse.results };
};

type Data = {
  realisations: DatabaseResult<RealisationDatas>[];
  parcours: DatabaseResult<ParcoursDatas>[];
};
export default function Index() {
  const { realisations, parcours } = useLoaderData<Data>();
  const parcoursRef = useRef<HTMLDivElement>(null);
  const [timelinePosition, setTimelinePosition] = useState([0, 0]);
  const params = useParams();
  const lang = (params.lang as keyof typeof t) || 'en';
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
    <div id='main-body' className='flex flex-col font-sans min-h-screen'>
      <Header extended />
      <main className='flex-1'>
        <div className='py-10 flex flex-col items-center space-y-16 bg-opacity-5'>
          <h2 className='font-semibold text-3xl'>{t[lang].achievements}</h2>
          <div className='flex flex-col sm:flex-row space-y-10 sm:space-y-0 sm:space-x-40 justify-center px-10'>
            {realisations.map((data) => (
              <a
                href={data.properties.link.url || ''}
                key={data.id}
                className='flex flex-col space-y-2 w-full sm:w-72 items-center hover:bg-slate-100 rounded-xl p-4 transition-all '>
                <img
                  alt={data.properties.name.title[0].plain_text}
                  src={
                    (data.properties.logo.files[0].type === 'external' && data.properties.logo.files[0].external.url) ||
                    (data.properties.logo.files[0].type === 'file' && data.properties.logo.files[0].file.url) ||
                    undefined
                  }
                  className='h-44 rounded-3xl shadow-lg'
                />

                <div className='flex flex-col space-y-4 items-center text-justify'>
                  <h5 className='font-semibold text-lg'>{data.properties.name.title[0].plain_text}</h5>
                  <span>{data.properties.description.rich_text[0].plain_text}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className='p-10 flex flex-col items-center space-y-16'>
          <h2 className='font-semibold text-3xl'>{t[lang].background}</h2>
          <div ref={parcoursRef} className='flex flex-col space-y-28 w-full max-w-4xl items-center'>
            <div
              className='w-px bg-blue-500 rounded-full absolute z-0'
              style={{ top: timelinePosition[0], bottom: timelinePosition[1] }}
            />
            {parcours
              .sort((a, b) => (a.properties.year.number || 0) - (b.properties.year.number || 0))
              .map((data, i) => (
                <div key={data.id} className='w-full flex flex-col items-center space-y-12'>
                  <h4 className='z-10 flex items-center justify-center font-semibold text-lg text-blue-500 border-blue-500 ring-1 ring-blue-500 rounded-full h-16 w-16 bg-white'>
                    {data.properties.year.number}
                  </h4>
                  {(i + 1) % 2 ? (
                    <div className='flex flex-row w-full justify-between items-center'>
                      <div className='sm:w-80 w-2/5 flex justify-center'>
                        <img
                          alt={data.properties.title.title[0].plain_text}
                          src={
                            (data.properties.image.files[0].type === 'external' &&
                              data.properties.image.files[0].external.url) ||
                            (data.properties.image.files[0].type === 'file' &&
                              data.properties.image.files[0].file.url) ||
                            undefined
                          }
                          className='max-w-full max-h-40 rounded-3xl'
                        />
                      </div>
                      <div className='sm:w-80 w-2/5 flex flex-col space-y-2'>
                        <h3 className='font-semibold text-xl'>{data.properties.title.title[0].plain_text}</h3>
                        <p className='text-justify'>{data.properties.description.rich_text[0].plain_text}</p>
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-row w-full justify-between items-center'>
                      <div className='sm:w-80 w-2/5 flex flex-col space-y-2'>
                        <h3 className='font-semibold text-xl'>{data.properties.title.title[0].plain_text}</h3>
                        <p className='text-justify'>{data.properties.description.rich_text[0].plain_text}</p>
                      </div>
                      <div className='sm:w-80 w-2/5 flex justify-center'>
                        <img
                          alt={data.properties.title.title[0].plain_text}
                          src={
                            (data.properties.image.files[0].type === 'external' &&
                              data.properties.image.files[0].external.url) ||
                            (data.properties.image.files[0].type === 'file' &&
                              data.properties.image.files[0].file.url) ||
                            undefined
                          }
                          className='max-w-full max-h-40 rounded-3xl'
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
