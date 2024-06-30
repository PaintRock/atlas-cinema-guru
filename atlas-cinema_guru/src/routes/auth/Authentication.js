import './auth.css';

export default function Authentication({setIsLoggedIn, setUserUsername}) {
    const [_switch, setSwitch] = useState('True');
    const [username, setUsername] = useState('');
    const [pasword, setPasword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const route = _switch ? '/api/auth/login' : '/api/auth/register';
            const response = await axios.post(route, { username, password });
            const { token } = response.data;
            localStorage.setItem('accessToken', token);
            setUsername(username);
            setIsLoggedIn(true);

        } catch (error) {
            console.error('Authentication error:', error);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-switch">
                    <Button label="Sign In" onClick={() => setSwitch(true)} className={_switch ? 'active' : ''}/>
                    <Button label="Sign Up" onClick={() => setSwitch(false)} className={!_switch ? 'active' : ''}/>
                </div>
                {_switch ? (
                    <Login
                     username={username}
                     password={password}
                     setUsername={setUsername}
                     setPassword={setPassword}  
                     />
                ) : (
                    <Register
                     username={username}
                     password={password}
                     setUsername={setUsername}
                     setPassword={setPassword}
                    />
                )}
                <Button label={_switch ? 'Login' : 'Register'} type="submit" className="auth-button" />
            </form>
        </div>
    );

                }
