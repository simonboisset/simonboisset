import { Footer } from "~/components/app/footer";
import { Header } from "~/components/content/layout";
import { AppLaunchIcon } from "~/components/icons/app-launch";
import { ReservationBadge } from "~/components/landing-page/book-a-meet";
import ProjectsList from "~/components/landing-page/project-list";
import { useTranslation } from "~/contents/i18n/translator";

export default function Index() {
  const t = useTranslation();

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
      title: t((l) => l.home.camping_car_park),
      description: t((l) => l.home.camping_car_park_description),
      image:
        "https://lezo-files.s3.eu-west-3.amazonaws.com/media/camping-car-park.png",
      href: "https://www.campingcarpark.com",
      tags: ["Mobile", "React Native", "Expo", "TypeScript"],
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col">
        <main className="flex-1 w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <AppLaunchIcon className="h-80 w-full" />
          <div className="flex flex-col gap-12 items-center">
            <h1 className="text-4xl font-black text-center">
              {t((l) => l.home.title)}
            </h1>
            <p className="text-xl text-center">
              {t((l) => l.home.description)}
            </p>
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
        </main>
        <Footer />
      </div>
    </div>
  );
}
