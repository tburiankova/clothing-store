import React, { Profiler } from 'react';

import Directory from '../../components/directory/directory.components';
import './homepage.styles.scss';

import { HomePageContainer } from './homepage.styles';

const HomePage = () => (
  <HomePageContainer>
    <Profiler
      id="directory"
      onRender={(id, phase, actualDuration) =>
        console.log({ id, phase, actualDuration })
      }
    >
      <Directory />
    </Profiler>
  </HomePageContainer>
);

export default HomePage;
