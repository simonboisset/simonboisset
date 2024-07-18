import {useFetcher} from '@remix-run/react';
import {useEffect, useState} from 'react';
import z from 'zod';
import {gtmConsentSchema} from '../session.server';

export type GTMConsent = z.infer<typeof gtmConsentSchema>;

export const useGTM = (id: string, defaultConsent?: GTMConsent) => {
  const fetcher = useFetcher();
  const [consent, setConsent] = useState<GTMConsent>(
    defaultConsent ?? {
      ad_personalization: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      analytics_storage: 'granted',
    },
  );

  const grantConsent = ({ad_personalization, ad_storage, ad_user_data, analytics_storage}: GTMConsent) => {
    if (process.env.NODE_ENV === 'development') {
      return;
    }
    sendToGTM('consent', 'update', {
      ad_user_data: ad_user_data === 'granted' ? 'granted' : 'denied',
      ad_personalization: ad_personalization === 'granted' ? 'granted' : 'denied',
      ad_storage: ad_storage === 'granted' ? 'granted' : 'denied',
      analytics_storage: analytics_storage === 'granted' ? 'granted' : 'denied',
    });
    setConsent({
      ad_personalization,
      ad_storage,
      ad_user_data,
      analytics_storage,
    });

    const formData = new FormData();
    formData.append('ad_personalization', ad_personalization);
    formData.append('ad_storage', ad_storage);
    formData.append('ad_user_data', ad_user_data);
    formData.append('analytics_storage', analytics_storage);

    fetcher.submit(formData, {
      method: 'POST',
      action: '/consent',
    });
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      return;
    }
    initGTM(id);
    sendToGTM('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    });
    if (defaultConsent) {
      grantConsent(defaultConsent);
    }
  }, []);

  return {grantConsent, consent};
};

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const setupGTM = (id: string) => {
  const getDataLayerScript = (): HTMLElement => {
    const dataLayerScript = document.createElement('script');
    dataLayerScript.innerHTML = getDataLayerSnippet();
    return dataLayerScript;
  };

  const getNoScript = (): HTMLElement => {
    const noScript = document.createElement('noscript');
    noScript.innerHTML = getIframeSnippet(id);
    return noScript;
  };

  const getScript = (): HTMLElement => {
    const script = document.createElement('script');
    script.innerHTML = getGTMScript(id);
    return script;
  };

  return {
    getDataLayerScript,
    getNoScript,
    getScript,
  };
};

export const initGTM = (id: string): void => {
  const gtm = setupGTM(id);

  const dataLayerScript = gtm.getDataLayerScript();
  const script = gtm.getScript();
  const noScript = gtm.getNoScript();

  document.head.insertBefore(dataLayerScript, document.head.childNodes[0]);
  document.head.insertBefore(script, document.head.childNodes[1]);
  document.body.insertBefore(noScript, document.body.childNodes[0]);
};

export const getGTMScript = (id: string) => {
  return `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${id}');
  `;
};

export const getIframeSnippet = (id: string) => {
  return `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>`;
};

export const getDataLayerSnippet = () =>
  `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}`;

export const sendToGTM = (command: string, action: string, options?: any) => {
  //@ts-expect-error
  gtag(command, action, options);
};
