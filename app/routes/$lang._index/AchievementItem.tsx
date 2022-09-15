type AchievementItemProps = {
  title: string;
  description: string;
  link: string;
  img: string;
};

export const AchievementItem = ({ description, img, title, link }: AchievementItemProps) => {
  return (
    <a
      href={link}
      className='flex flex-col space-y-2 w-full sm:w-72 items-center hover:bg-slate-100 rounded-xl p-4 transition-all '>
      <img alt={title} src={img} className='h-44 rounded-3xl shadow-lg' />
      <div className='flex flex-col space-y-4 items-center text-justify'>
        <h5 className='font-semibold text-lg'>{title}</h5>
        <span>{description}</span>
      </div>
    </a>
  );
};
