type BackgroundItemProps = {
  title: string;
  description: string;
  year: number;
  alt: string;
  img: string;
  link: string;
  reverse?: boolean;
};

export const BackgroundItem = ({ description, img, title, year, reverse, alt }: BackgroundItemProps) => {
  return (
    <div className='w-full flex flex-col items-center space-y-12'>
      <h4 className='z-10 flex items-center justify-center font-semibold text-lg text-blue-500 border-blue-500 ring-1 ring-blue-500 rounded-full h-16 w-16 bg-white'>
        {year}
      </h4>
      {!reverse ? (
        <div className='flex flex-row w-full justify-between items-center'>
          <div className='sm:w-80 w-2/5 flex justify-center'>
            <img alt={alt} src={img} className='max-w-full max-h-40 rounded-3xl' />
          </div>
          <div className='sm:w-80 w-2/5 flex flex-col space-y-2'>
            <h3 className='font-semibold text-xl'>{title}</h3>
            <p className='text-justify'>{description}</p>
          </div>
        </div>
      ) : (
        <div className='flex flex-row w-full justify-between items-center'>
          <div className='sm:w-80 w-2/5 flex flex-col space-y-2'>
            <h3 className='font-semibold text-xl'>{title}</h3>
            <p className='text-justify'>{description}</p>
          </div>
          <div className='sm:w-80 w-2/5 flex justify-center'>
            <img alt={alt} src={img} className='max-w-full max-h-40 rounded-3xl' />
          </div>
        </div>
      )}
    </div>
  );
};
