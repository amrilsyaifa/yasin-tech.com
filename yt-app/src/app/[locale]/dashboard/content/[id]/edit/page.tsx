'use client';

import CreateContentForm from '@views/dashboard/Content/Create';
import { useTranslations } from 'next-intl';

const EditContent = () => {
  const t = useTranslations('Dashboard');
  return <CreateContentForm title={t('content.create.title')} />;
};

export default EditContent;
