import {Cookie} from 'lucide-react';
import {forwardRef, useState} from 'react';
import {Button, ButtonProps} from '~/ui/button';
import {Dialog, DialogContent, DialogTrigger} from '~/ui/dialog';
import {Drawer, DrawerContent, DrawerTrigger} from '~/ui/drawer';
import {GtmBannerContent} from './gtm-banner-content';
import {GTMConsent, useGTM} from './use-gtm';
import {useIsSmartphone} from './use-media-query';

type GtmBannerProps = {
  id: string;
  defaultConsent?: GTMConsent;
};

export const GtmBanner = ({id, defaultConsent}: GtmBannerProps) => {
  const {consent, grantConsent} = useGTM(id, defaultConsent);
  const [hasFirstConsent, setHasFirstConsent] = useState(!!defaultConsent);
  const [open, setOpen] = useState(!defaultConsent);
  const isSmartphone = useIsSmartphone();
  const handleTooggleOpen = (nextOpen: boolean) => {
    if (!hasFirstConsent && !nextOpen) {
      return;
    }
    setOpen(nextOpen);
  };

  const saveConsent = (consent: GTMConsent) => {
    grantConsent(consent);
    setHasFirstConsent(true);
    setOpen(false);
  };
  if (process.env.NODE_ENV === 'development') {
    return null;
  }
  if (isSmartphone) {
    return (
      <Drawer open={open} dismissible={hasFirstConsent} onOpenChange={handleTooggleOpen}>
        <DrawerTrigger asChild>
          <CookieButton />
        </DrawerTrigger>
        <DrawerContent>
          <GtmBannerContent defaultConsent={consent} saveConsent={saveConsent} />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={open} onOpenChange={handleTooggleOpen}>
      <DialogTrigger asChild>
        <CookieButton />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <GtmBannerContent defaultConsent={consent} saveConsent={saveConsent} />
      </DialogContent>
    </Dialog>
  );
};

const CookieButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button variant="outline" size="icon" className="fixed bottom-4 left-4" ref={ref} {...props}>
    <Cookie className="size-8" />
  </Button>
));
