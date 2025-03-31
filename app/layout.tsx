import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tooodo",
  description: "create to do",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //　supabaseからユーザー設定を取得
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user
  return (
    <html lang="ja">
      <body className={`${inter.className}`}>
        {/* ナビバーの設定 */}
        <AppBar sx={{ backgroundColor: '#255F38' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              T0D0 L1ST
            </Typography>
          </Toolbar>
        </AppBar>
        {user && (
          <Box display="flex" justifyContent="end" sx={{ mt: 10, mx: 'auto', width: '80%' }}>
            <Button href="/todo-list" variant="contained" color="primary" sx={{ ml: 2 }}>TOP</Button>
            <Button href="/todo-create" variant="contained" color="success" sx={{ ml: 2 }}>リストを追加</Button>
            <form action="auth/signout" method="post">
              <Button type="submit" variant="outlined" color="inherit" sx={{ ml: 2 }}>ログアウト</Button>
            </form>
          </Box>
        )}
        <Box display="flex" justifyContent="center" sx={{ maxWidth: "2xl", mx: "auto", p: 2 }}>
          <Box sx={{ width: "80%", maxWidth: "100%", mx: "auto", mt: "8" }}>
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}
