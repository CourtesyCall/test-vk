import React, {useContext, useEffect} from 'react';
import * as VKID from "@vkid/sdk";
import {useNavigate} from "react-router";
import {UserContext} from "../context";





const VkAuth = ({setAccessToken, setUserId }) => {

    const { setUser } = useContext(UserContext); // Получите setUser из контекста

    const navigate = useNavigate();
    // const onSuccessHandler = async (code,deviceId ) => {
    //     console.log('code - '+ code)
    //     console.log('deviceId - '+ deviceId)
    //
    //     VKID.Auth.exchangeCode(code, deviceId).then((response)=>{
    //         console.log("Access Token:", response.access_token);
    //         setAccessToken(response.access_token);
    //         navigate("/post"); // Переход на страницу отправки постов
    //     })
    // }

    // const onErrorHandler = () =>{
    //
    // }

    function generateCodeVerifier() {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
        const length = 128; // Максимальная длина строки
        let result = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            result += charset[randomIndex];
        }
        return result;
    }

    const codeVerifier = generateCodeVerifier();
    console.log("Code Verifier:", codeVerifier);



    useEffect(()=>{
        // VKID.Config.init({
        //     app: 52847670, // Идентификатор приложения.
        //     redirectUrl: 'http://localhost', // Адрес для перехода после авторизации.
        //     responseMode: VKID.ConfigResponseMode.Callback,
        //     source: VKID.ConfigSource.LOWCODE,
        //     state: `dj29fnsadjsd823242dsf`, // Произвольная строка состояния приложения.
        //     action: {
        //         name: `qr_auth`,
        //     },
        //     codeVerifier: '4564', // Параметр в виде случайной строки. Обеспечивает защиту передаваемых данных.
        //     scope: 'vkid.personal_info', // Список прав доступа, которые нужны приложению.
        // });

        console.log(process.env.APP + '- env app')
        console.log(process.env.REDIRECT_URL + '- redirect')

        VKID.Config.init({
            app: 52876878, // Идентификатор приложения.
            redirectUrl: 'http://localhost', // Адрес для перехода после авторизации.
            state: 'dj29fnsadjsd823242dsf', // Произвольная строка состояния приложения.
            codeVerifier: codeVerifier, // Параметр в виде случайной строки. Обеспечивает защиту передаваемых данных.
            scope: 'email phone wall', // Список прав доступа, которые нужны приложению.
            responseMode: VKID.ConfigResponseMode.Callback,
            action: {
                        name: `qr_auth`,
            },
        });


        // Создание экземпляра кнопки.
        const oneTap = new VKID.OneTap();

        // Получение контейнера из разметки.
        const container = document.getElementById('VkIdSdkOneTap');
        console.log(container)

        if(container){
            // Отрисовка кнопки в контейнере с именем приложения APP_NAME, светлой темой и на русском языке.
            oneTap.render({ container: container,showAlternativeLogin: true, scheme: VKID.Scheme.LIGHT, lang: VKID.Languages.RUS });



            oneTap.on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, async function (payload) {
                const code = payload.code;
                const deviceId = payload.device_id;
                console.log("payload - " + JSON.stringify(payload))

                console.log('code - ' + code)
                console.log('deviceId - ' + deviceId)

                const data = await VKID.Auth.exchangeCode(code, deviceId);

                console.log("data - " + JSON.stringify(data))

                const user = await VKID.Auth.userInfo(data.access_token);

                console.log("user - " + JSON.stringify(user))

                setAccessToken(data.access_token);
                setUserId(user.user.user_id);
                if(data.access_token){
                    setUser(user);
                    navigate("/testpost");} // Переход на страницу отправки постов
            });
        }
    },[])


    return (
        <div className='bg-gray-100 flex justify-center items-center h-screen'>
            <div className='text-center border border-blue-400 p-8 shadow-xl w-96 h-64 bg-white'>
                <h2 className='mb-6 text-lg font-bold text-blue-600'>Авторизация через VK</h2>
                <div id="VkIdSdkOneTap"></div>
            </div>
        </div>
    );
};

export default VkAuth;