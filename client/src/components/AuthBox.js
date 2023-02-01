import React from 'react'
const AuthBox = ({ register }) => {
    return (
        <article className="auth">
            <section className="auth__box">
                <div className="auth__header">
                    <h1>{register ? "Register" : "Login"}</h1>
                </div>
                <form>
                    {register && (
                        <div className="auth__field">
                            <label>Name</label>
                            <input type="text" />
                        </div>
                    )}
                    <div className="auth__field">
                        <label>Email</label>
                        <input type="text" />
                    </div>

                    <div className="auth__field">
                        <label>Password</label>
                        <input type="password" />
                    </div>
                    {register && (
                        <div className="auth__field">
                            <label>Confirm Password</label>
                            <input type="password" />   
                            {/* <div className="p auth__error">Somthing went wrong</div> */}
                        </div>
                    )}
                    <div className="auth__footer">
                        <p className="auth__error">Somthing went wrong</p>
                        <button className="btn">{register ? "Register" : "Login"}</button>
                    </div>
                </form>
            </section>
        </article>
    )
}

export default AuthBox