import { Link } from "@remix-run/react";
import { Cookie, HelpCircle } from "lucide-react";
import { forwardRef, useId, useState } from "react";
import { useTranslation } from "~/routes/$lang/route";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "~/ui/alert";
import { Button } from "~/ui/button";
import { Label } from "~/ui/label";
import { Switch } from "~/ui/switch";
import { GTMConsent } from "./use-gtm";

type GtmBannerContentProps = {
  saveConsent: (consent: GTMConsent) => void;
  defaultConsent: GTMConsent;
};
export const GtmBannerContent = forwardRef<
  HTMLDivElement,
  GtmBannerContentProps
>(({ saveConsent, defaultConsent }: GtmBannerContentProps, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [consent, setConsent] = useState<GTMConsent>(defaultConsent);
  const { t } = useTranslation();
  const onToggleConsent = (key: keyof GTMConsent) => () =>
    setConsent((prev) => ({
      ...prev,
      [key]: prev[key] === "granted" ? "denied" : "granted",
    }));

  const onExpanded = () => {
    if (isExpanded) {
      saveConsent(consent);
      return;
    }
    setIsExpanded(true);
  };

  const onAcceptAll = () => {
    saveConsent({
      ad_personalization: "granted",
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
    });
  };

  const onDenyAll = () => {
    saveConsent({
      ad_personalization: "denied",
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
    });
  };

  return (
    <div
      className="p-4 mb-16 flex-col flex text-success-foreground text-sm relative overflow-y-scroll max-h-[85vh]"
      ref={ref}
    >
      <div className="rounded-full shrink-0 size-40 flex items-center justify-center mx-auto mb-4">
        <img
          src="/icon-515x515.png"
          alt="Logo"
          className="size-24 text-success object-cover rounded-full"
        />
      </div>
      <div className="pb-14">
        <h2 className="text-lg font-semibold mb-2">
          {t((l) => l.consent.bannerTitle)}
        </h2>
        <p className="text-[10px]">{t((l) => l.consent.bannerDescription)}</p>
        <p className="text-[10px]">
          {t((l) => l.consent.bannerThanksForTakingTime)}
        </p>
        <Alert className="bg-background/40 mt-4">
          <Cookie className="size-4" />
          <AlertTitle>
            {t((l) => l.consent.whatAreYourCookiesUsedFor)}
          </AlertTitle>
          <AlertDescription>
            <Accordion
              type="single"
              className="w-full"
              onValueChange={(value) => setIsExpanded(value === "items")}
              value={isExpanded ? "items" : ""}
            >
              <AccordionItem value="items">
                <AccordionTrigger className="text-[10px] text-left outline-none">
                  {t((l) => l.consent.shareDataToGoogle)}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <SwitchSection
                    label="Stockage d'analytics"
                    checked={consent.analytics_storage === "granted"}
                    onChange={onToggleConsent("analytics_storage")}
                    helpDescription={t(
                      (l) =>
                        l.consent
                          .authoriseGoogleAnalyticsToMeasureYourUseOfOurWebsiteToImproveOurServices
                    )}
                    link="https://policies.google.com/technologies/ads"
                  />
                  <SwitchSection
                    label="Stockage de publicité"
                    checked={consent.ad_storage === "granted"}
                    onChange={onToggleConsent("ad_storage")}
                    helpDescription={t(
                      (l) =>
                        l.consent
                          .authoriseGoogleAnalyticsToSaveAdvertisingInformationToOfferYouPersonalisedAds
                    )}
                    link="https://policies.google.com/technologies/ads"
                  />
                  <SwitchSection
                    label="Données utilisateur de publicité"
                    checked={consent.ad_user_data === "granted"}
                    onChange={onToggleConsent("ad_user_data")}
                    helpDescription={t(
                      (l) =>
                        l.consent
                          .authoriseGoogleAnalyticsToCollectUserDataToOfferYouPersonalisedAds
                    )}
                    link="https://policies.google.com/technologies/ads"
                  />
                  <SwitchSection
                    label="Personnalisation de la publicité"
                    checked={consent.ad_personalization === "granted"}
                    onChange={onToggleConsent("ad_personalization")}
                    helpDescription={t(
                      (l) =>
                        l.consent
                          .authoriseGoogleAnalyticsToCustomiseTheAdsYouSeeOnOurWebsite
                    )}
                    link="https://policies.google.com/technologies/ads"
                  />
                </AccordionContent>
              </AccordionItem>
              {/* <AccordionItem value="items">
                <AccordionTrigger className="text-[10px] text-left">
                  Mesure de l'audience
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <SwitchSection
                    label="Google Analytics 4"
                    checked={consent.ad_personalization}
                    onChange={onToggleConsent("ad_personalization")}
                    helpDescription="Permet de mesurer l'audience de notre site web."
                    link="https://support.google.com/analytics/answer/6004245?hl=fr"
                  />
                  <SwitchSection
                    label="Facebook Pixel"
                    checked={consent.ad_personalization}
                    onChange={onToggleConsent("ad_personalization")}
                    helpDescription="Permet d'identifier les visiteurs de Facebook."
                    link="https://fr-fr.facebook.com/business/gdpr"
                  />
                </AccordionContent>
              </AccordionItem> */}
            </Accordion>
          </AlertDescription>
        </Alert>
      </div>
      <div className="flex gap-4 fixed left-0 bottom-0 w-full p-4 bg-success">
        <Button className="flex-1" onClick={onDenyAll}>
          {t((l) => l.consent.denyAll)}
        </Button>
        <Button className="flex-1" onClick={onExpanded}>
          {isExpanded
            ? t((l) => l.consent.save)
            : t((l) => l.consent.seeDetails)}
        </Button>
        <Button className="flex-1" onClick={onAcceptAll}>
          {t((l) => l.consent.acceptAll)}
        </Button>
      </div>
    </div>
  );
});
GtmBannerContent.displayName = "GtmBannerContent";

type SwitchSectionProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
  helpDescription?: string;
  link?: string;
};
const SwitchSection = ({
  label,
  checked,
  onChange,
  helpDescription,
  link,
}: SwitchSectionProps) => {
  const id = useId();
  return (
    <div>
      {!!link && (
        <Link to={link} className="absolute left-4 mt-4 size-4">
          <HelpCircle className="size-4" />
        </Link>
      )}
      <div className="border p-2 rounded-md">
        <div className="flex items-center">
          <Label htmlFor={id} className="flex-1">
            {label}
          </Label>
          <Switch id={id} onCheckedChange={onChange} checked={checked} />
        </div>
        {!!helpDescription && <p className="text-[10px]">{helpDescription}</p>}
      </div>
    </div>
  );
};
