import '@styles/globals.scss';
import '@styles/external.scss';
import { NextIntlClientProvider, createTranslator } from 'next-intl';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

interface ParamProps {
  params: {
    locale: string;
  };
}
interface LocaleLayoutProps extends ParamProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

export async function generateMetadata({ params }: ParamProps) {
  const messages = (await import(`../../messages/${params.locale}.json`))
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

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
        </NextIntlClientProvider>
        <div id='portal' />
      </body>
    </html>
  );
}
