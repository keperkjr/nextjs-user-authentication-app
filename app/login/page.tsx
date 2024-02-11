"use client"
import React from 'react'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from "next-auth/react"

export default function LoginPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setLoading(true);

            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });
            
            if (result == null || result.error) {
                throw new Error(`Error occurred attempting to login. ${result?.error}`);
            }
            
            toast.success('Logged in successfully!');
            router.push(callbackUrl);
        } catch (error: any) {
            console.log(error);
            toast.error(String(error?.message || ''));
            setLoading(false);
        } finally {
        }
    }

    function isFormValid() : boolean {
        return (email?.trim() ?? '') != '' && (password?.trim() ?? '') != '';
    }

    function isButtonDisabled() : boolean {
        return loading || !isFormValid();
    }

    return (
        <main>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-lg-5 text-center shadow bg-light p-5">
                        <h2 className="mb-4">
                            Login
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <input type="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                className='form-control mb-3'
                                placeholder='Email'
                            />
                            <input type="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                className='form-control mb-3'
                                placeholder='Password'
                            />     

                            <button className="btn btn-primary btn-raised" disabled={isButtonDisabled()}>                                
                                {loading ? 'Please wait...' : 'Submit'}
                            </button>                                                   
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}