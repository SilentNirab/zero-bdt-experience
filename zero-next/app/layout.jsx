export const metadata = {
  title: 'Zero — Human Infrastructure to Get Hired',
  description: 'Zero is building human infrastructure for the AI era. Learn, build, and get hired through immersive, AI-native experiences designed by reverse-engineering real jobs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="referrer" content="no-referrer" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#000000', color: '#ffffff' }}>
        {children}
      </body>
    </html>
  );
}
