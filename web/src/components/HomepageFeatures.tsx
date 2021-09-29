/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { translate, TranslateParam } from '@docusaurus/Translate';
import clsx from 'clsx';
import React from 'react';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: TranslateParam<string>;
  image: string;
  description: TranslateParam<string>;
};

const FeatureList: FeatureItem[] = [
  {
    title: { message: 'Silbo', id: 'homepage.feature.silbo.title' },
    image: '/img/silbo.svg',
    description: { message: 'The patient flow management plateform', id: 'homepage.feature.silbo.description' },
  },
  {
    title: { message: 'react-router-url', id: 'homepage.feature.react-router-url.title' },
    image: '/img/react-router-url-logo.svg',
    description: {
      message: 'Light and simple router for react using URL api',
      id: 'homepage.feature.react-router-url.description',
    },
  },
  {
    title: { message: 'react-hook-input', id: 'homepage.feature.react-hook-input.title' },
    image: '/img/react-hook-input-logo.svg',
    description: {
      message: 'A react library for form validation',
      id: 'homepage.feature.react-hook-input.description',
    },
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <img className={styles.featureSvg} alt={title.message} src={image} />
      </div>
      <div className='text--center padding-horiz--md'>
        <h3>{translate(title)}</h3>
        <p>{translate(description)}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
