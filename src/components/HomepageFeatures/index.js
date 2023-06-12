import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '易于使用',
    Svg: require('@site/static/img/easy.svg').default,
    description: (
      <>
        原生C#热更新体验，开发工作流与传统Unity C#开发几乎相同，零学习和使用成本。
      </>
    ),
  },
  {
    title: '实现高效',
    Svg: require('@site/static/img/efficient.svg').default,
    description: (
      <>
        C++实现，与il2cpp深度集成，运行性能和内存占用指标都远远优于其他任何热更新方案。
        开创性的DHE技术让热更新的游戏逻辑的运行性能基本达到原生AOT的水平。
      </>
    ),
  },
  {
    title: '稳定可靠',
    Svg: require('@site/static/img/reliable-dark.svg').default,
    description: (
      <>
      极其稳定可靠，足以满足大中型商业项目的稳定性要求。当前上千个商业游戏项目完成接入，其中有几百款已经双端上线。
      大多数头部公司如腾讯、网易、字节、funplus都已接入。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
