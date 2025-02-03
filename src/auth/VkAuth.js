import React, {useContext, useEffect} from 'react';
import * as VKID from "@vkid/sdk";
import {useNavigate} from "react-router";
import {UserContext} from "../context";





const VkAuth = ({setAccessToken, setUserId }) => {

    const { setUser } = useContext(UserContext); // Получите setUser из контекста
    const navigate = useNavigate();


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


    useEffect(() => {
        const storedAccessToken = localStorage.getItem("access_token");
        const storedUserId = localStorage.getItem("user_id");

        if (storedAccessToken && storedUserId) {
            setAccessToken(storedAccessToken);
            setUserId(storedUserId);
            navigate("/testpost"); // Переход на страницу, если токен найден
        }
    }, [setAccessToken, setUserId, navigate]);



    useEffect(()=>{
        const newCodeVerifier = generateCodeVerifier();
        VKID.Config.init({
            app: 52876878, // Идентификатор приложения.
            redirectUrl: 'https://test-vk.onrender.com', // Адрес для перехода после авторизации.
            state: newCodeVerifier, // Произвольная строка состояния приложения.
            codeVerifier: 'dj29fnsadjsd823242dsfdsfsdfsdfsdf', // Параметр в виде случайной строки. Обеспечивает защиту передаваемых данных.
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
                try {
                    const code = payload.code;
                    const deviceId = payload.device_id;

                    console.log("payload - " + JSON.stringify(payload));
                    console.log('code - ' + code);
                    console.log('deviceId - ' + deviceId);

                    // Передаём codeVerifier явно
                    const data = await VKID.Auth.exchangeCode(code, deviceId, newCodeVerifier);

                    console.log("data - " + JSON.stringify(data));

                    const user = await VKID.Auth.userInfo(data.access_token);

                    console.log("user - " + JSON.stringify(user));
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("user_id", user.user.user_id);
                    setAccessToken(data.access_token);
                    setUserId(user.user.user_id);

                    if (data.access_token) {
                        setUser(user);
                        navigate("/testpost");
                    }
                } catch (error) {
                    console.error("Ошибка авторизации:", error);
                }// Переход на страницу отправки постов
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