'use client';

import CreateFormContent from '@views/dashboard/Content/Create';
import { useTranslations } from 'next-intl';

const CreateContent = () => {
  const t = useTranslations('Dashboard');
  return <CreateFormContent title={t('content.create.title')} />;
};

export default CreateContent;
