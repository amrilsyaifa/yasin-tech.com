import { createTranslator } from 'next-intl';
import WrapperAdminSidebar from '@components/Sidebar/WrapperAdminSidebar';

// https://tailwindcomponents.com/component/admin-panel-basic-template
interface ParamProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: ParamProps) {
  const messages = (await import(`../../../messages/${params.locale}.json`))
    .default;
  const t = createTranslator({ locale: params.locale, messages });
  return {
    title: t('LocaleLayout.title'),
    description: t('LocaleLayout.description'),
    openGraph: {
      title: t('LocaleLayout.title'),
      description: t('LocaleLayout.description'),
      siteName: t('LocaleLayout.title'),
    },
  };
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WrapperAdminSidebar>{children}</WrapperAdminSidebar>;
}
