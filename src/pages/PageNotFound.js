import React from 'react';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import PageLayout from './PageLayout';

const PageNotFound = () => (
  <PageLayout>
    <Typography type="title" component="p">
      Страница не найдена
    </Typography>
    <Link to="/">
      <Typography type="body1" component="p">
        Перейти на главную
      </Typography>
    </Link>
  </PageLayout>
);

export default PageNotFound;
