"use client"
import React from 'react'
import toast from 'react-hot-toast'
import {useRouter} from 'next/navigation'

export default function RegisterPage() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await fetch(`${process.env.API}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(`${responseData.error || 'An error occurred.'}`);
            }
            
            toast.success('Registered successfully!');
            router.push("/login");
        } catch (error: any) {
            console.log(error);
            toast.error(String(error?.message || ''));
            setLoading(false);
        } finally {
        }
    }

    function isFormValid() : boolean {
        return (name?.trim() ?? '') != '' && (email?.trim() ?? '') != '' && (password?.trim() ?? '') != '';
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
                            Register
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <input type="text" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                className='form-control mb-3'
                                placeholder='Name'
                            />
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