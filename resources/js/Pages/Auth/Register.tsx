import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { FcGoogle } from 'react-icons/fc'
import { Input } from '@/Components/ui/input'
import { Label } from '@radix-ui/react-label'
import React, { FC, FormEventHandler, useEffect } from 'react'
import { Head, router, useForm } from '@inertiajs/react'

const Register = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <Head title="Register" />
            <form onSubmit={submit}>
                <Card className='w-96 shadow-lg'>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>Enter your email below to create your account</CardDescription>
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
                            <Label htmlFor="name">Name</Label>
                            <Input disabled={processing} value={data.name} onChange={e=>setData('name',e.target.value)} id="name" type="text" placeholder="Mr. Example" />
                            {errors.name&&<span className='-mt-4 text-xs text-red-500 leading-10'>{errors.name}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input disabled={processing} value={data.email} onChange={e=>setData('email',e.target.value)} id="email" type="email" placeholder="m@example.com" />
                            {errors.email&&<span className='-mt-4 text-xs text-red-500 leading-10'>{errors.email}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input disabled={processing} value={data.password} onChange={e=>setData('password',e.target.value)} id="password" type="password" />
                            {errors.password&&<span className='-mt-4 text-xs text-red-500 leading-10'>{errors.password}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Confirm Password</Label>
                            <Input disabled={processing} value={data.password_confirmation} onChange={e=>setData('password_confirmation',e.target.value)} id="password" type="password" />
                            {errors.password_confirmation&&<span className='-mt-4 text-xs text-red-500 leading-10'>{errors.password_confirmation}</span>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type='submit' disabled={processing} className="w-full">Register</Button>
                    </CardFooter>
                    <CardFooter>
                        <Button type='button' disabled={processing} variant={'link'} onClick={()=>router.get('login')} className="w-full">Already have an account? Log In</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}

export default Register