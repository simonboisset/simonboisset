import { ReservationBadge } from "~/domains/core/book-a-meet";
import { AppLaunchIcon } from "~/icons/app-launch";
import { Footer } from "../$lang/footer";
import { useTranslation } from "../$lang/route";
import ProjectsList from "./project-list";

export default function Home() {
  const { t } = useTranslation();
  const projects = [
    {
      title: t((l) => l.home.silbo),
      description: t((l) => l.home.silbo_description),
      image: "https://lezo-files.s3.fr-par.scw.cloud/simon-blog/silbo.webp",
      href: "https://silbo.com/fr/",
      tags: [
        "React",
        "React Native",
        "Expo",
        "TypeScript",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
    },
    {
      title: t((l) => l.home.linote),
      description: t((l) => l.home.linote_description),
      image: "https://lezo-files.s3.fr-par.scw.cloud/simon-blog/linote.webp",
      href: "https://linote.fr/",
      tags: ["React Native", "Expo", "TypeScript"],
    },
    {
      title: t((l) => l.home.mon_pont_chaban),
      description: t((l) => l.home.mon_pont_chaban_description),
      image: "https://lezo-files.s3.fr-par.scw.cloud/simon-blog/chaban.webp",
      href: "https://pont-chaban-delmas.com/",
      tags: [
        "React",
        "React Native",
        "Expo",
        "TypeScript",
        "Node.js",
        "Remix",
        "Prisma",
        "Trpc",
        "Turborepo",
      ],
    },
    {
      title: t((l) => l.home.questovery),
      description: t((l) => l.home.questovery_description),
      image:
        "https://lezo-files.s3.fr-par.scw.cloud/simon-blog/questovery.webp",
      href: "https://www.questovery.com/",
      tags: [
        "React",
        "React Native",
        "Expo",
        "TypeScript",
        "Node.js",
        "Remix",
        "Prisma",
        "Trpc",
        "Turborepo",
      ],
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-4 w-full max-w-screen-lg mx-auto mt-24 px-12">
        <AppLaunchIcon className="h-80 w-full" />
        <div className="flex flex-col gap-12 items-center">
          <h1 className="text-4xl font-black text-center">
            {t((l) => l.home.title)}
          </h1>
          <p className="text-xl text-center">{t((l) => l.home.description)}</p>
          <div className="flex flex-row gap-4">
            <ReservationBadge />
          </div>
          <div className="mt-24 h-px w-full max-w-sm bg-foreground/30" />
          <h1 className=" text-3xl font-bold text-center">
            {t((l) => l.home.achievements)}
          </h1>
          <p className="text-lg text-center">
            {t((l) => l.home.achievements_description)}
          </p>
          <ProjectsList projects={projects} />
        </div>
      </div>
      <Footer />
    </>
  );
}
