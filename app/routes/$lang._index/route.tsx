import { Link } from "@remix-run/react";
import { Mail } from "lucide-react";
import { AppLaunchIcon } from "~/icons/app-launch";
import { Button } from "~/ui/button";
import { Footer } from "../$lang/footer";
import { useTranslation } from "../$lang/route";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col gap-4 w-full max-w-screen-lg mx-auto mt-24 px-12">
        <AppLaunchIcon className="h-80 w-full" />
        <div className="flex flex-col gap-12 items-center">
          <h1 className="text-4xl font-black text-center">
            {t((l) => l.home.title)}
          </h1>
          <p className="text-xl text-center">{t((l) => l.home.description)}</p>
          <Button asChild className="flex flex-row gap-4" size="rounded">
            <Link to="mailto:simon@lezo.dev">
              <Mail />
              <span>{t((l) => l.home.contact_me)}</span>
            </Link>
          </Button>
          <div className="mt-24 h-px w-full max-w-sm bg-foreground/30" />
          <h1 className=" text-3xl font-bold text-center">
            {t((l) => l.home.achievements)}
          </h1>
          <p className="text-lg text-center">
            {t((l) => l.home.achievements_description)}
          </p>
          <section className="gap-12 grid sm:grid-cols-3 grid-cols-1">
            <AchievementCard
              title={t((l) => l.home.silbo)}
              description={t((l) => l.home.silbo_description)}
              image="https://lezo-files.s3.fr-par.scw.cloud/simon-blog/silbo.webp"
              link="https://silbo.com/fr/"
            />
            <AchievementCard
              title={t((l) => l.home.linote)}
              description={t((l) => l.home.linote_description)}
              image="https://lezo-files.s3.fr-par.scw.cloud/simon-blog/linote.webp"
              link="https://linote.fr/"
            />
            <AchievementCard
              title={t((l) => l.home.mon_pont_chaban)}
              description={t((l) => l.home.mon_pont_chaban_description)}
              image="https://lezo-files.s3.fr-par.scw.cloud/simon-blog/chaban.webp"
              link="https://pont-chaban-delmas.com/"
            />
            <AchievementCard
              title={t((l) => l.home.atypique_radio)}
              description={t((l) => l.home.atypique_radio_description)}
              image="https://lezo-files.s3.fr-par.scw.cloud/simon-blog/atypique.webp"
              link="https://www.atypiqueradio.fr/"
            />
            <AchievementCard
              title={t((l) => l.home.questovery)}
              description={t((l) => l.home.questovery_description)}
              image="https://lezo-files.s3.fr-par.scw.cloud/simon-blog/questovery.webp"
              link="https://www.questovery.com/"
            />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

const AchievementCard = ({
  title,
  description,
  image,
  link,
}: {
  title: string;
  description: string;
  image: string;
  link: string;
}) => {
  return (
    <Link
      className="flex flex-col gap-4 items-center bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer shadow-lg rounded-xl overflow-hidden"
      to={link}
    >
      <img
        className="w-full h-52 object-cover"
        src={image}
        width={200}
        height={200}
        alt={title}
      />
      <div className="flex flex-col gap-2 items-center p-4">
        <span className="text-lg font-bold">{title}</span>
        <span className="text-sm text-justify">{description}</span>
      </div>
    </Link>
  );
};
