import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { FcGoogle } from 'react-icons/fc'
import { Input } from '@/Components/ui/input'
import { Label } from '@radix-ui/react-label'
import React, { FC, FormEventHandler, useEffect } from 'react'
import { Head, router, useForm } from '@inertiajs/react'

const Login:FC = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };
    return (
        <div className='min-h-screen flex items-center justify-center '>
            <Head title="Log in" />
            <Card className='w-96 shadow-lg'>
                <form onSubmit={submit}>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Log In</CardTitle>
                        <CardDescription>Log In To Your Account</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-1 gap-6">
                            <Button disabled={processing} variant="outline">
                                <FcGoogle className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input disabled={processing} id="email" autoFocus autoComplete='off' type="email" placeholder="m@example.com" value={data.email} onChange={e=>setData('email',e.target.value)} />
                            {errors.email&&<span className='-mt-4 text-xs text-red-500 leading-10'>{errors.email}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input disabled={processing} id="password" type="password" value={data.password} onChange={e=>setData('password',e.target.value)} />
                            {errors.password&&<span className='-mt-4 text-xs text-red-500 leading-10'>{errors.password}</span>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button disabled={processing} type='submit' className="w-full">Log In</Button>
                    </CardFooter>
                    <CardFooter>
                        <Button disabled={processing} type='button' variant={'link'} onClick={()=>router.get('register')} className="w-full">New User? Create an Account...</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default Login