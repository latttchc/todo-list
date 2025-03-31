'use client'

import { Card, Typography } from "@mui/material"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"

// 認証コンポート
const AuthForm = () => {
    const supabase = createClientComponentClient();
    return (
        <Card sx={{ maxWidth: 600, p: 5 }}>
            <Typography gutterBottom variant="h5" component="div">
                認証フォーム
            </Typography>
            <Auth
                supabaseClient={supabase}
                view="magic_link"
                showLinks={false}
                providers={[]}
                redirectTo="https://todo-list-jcqu83j0x-yuukis-projects-059da848.vercel.app"
                appearance={{ theme: ThemeSupa }}
            />
        </Card>
    )
}

export default AuthForm;
