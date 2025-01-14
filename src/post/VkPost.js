import React, {useEffect, useState} from 'react';
import * as VKID from "@vkid/sdk";
import {useNavigate} from "react-router";
const VkPost = ({ accessToken }) => {

    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handlePost = async () => {
        if (!accessToken) {
            alert("Нет доступа. Пожалуйста, авторизуйтесь.");
            navigate("/"); // Переход обратно на авторизацию
            return;
        }

        try {
            const response = await fetch(
                `https://api.vk.com/method/wall.post?access_token=${accessToken}&v=5.199&message=${encodeURIComponent(
                    inputText
                )}&owner_id=-vk1.a.sUT4u3mQp0LVfB8tlkzkeMmNzLyXruRYJqmeCgMxp9SbVrHS8Mt0k7qrI4NNQ-Xw8kRKko1jQIbaqHwwoX-EEtu6261lEQd39eYZGmwr0oQSovx5EgVn27oS8TembUiUdy2MKtTv9qvirKo20pQz_1NiSGkumFtAqSX72qPMaD04aUCnRD4gGj9VOGvlQN5aHgChXy9Nh33PrQdDhv9bEQ&from_group=0`, // Замените YOUR_GROUP_ID на ID вашей группы со знаком "-"
                {
                    method: "POST",
                }
            );
            const data = await response.json();

            if (data.response) {
                alert("Пост успешно опубликован!");
                setInputText(""); // Очистка поля ввода
            } else {
                alert("Ошибка: " + JSON.stringify(data.error));
            }
        } catch (error) {
            console.error("Ошибка при отправке поста:", error);
            alert("Ошибка при отправке поста.");
        } finally {
            setIsLoading(false); // Выключаем индикатор загрузки
        }


    }

    useEffect(async () => {
        console.log('access token - ' + accessToken);
        const response = await fetch(``)
    })





    const handleSubmit = async (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        await handlePost(); // Вызываем функцию отправки
    };


    return (
        <div>
            <h2>Опубликовать пост в группе VK</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Введите текст поста"
                    style={{ width: "300px", marginRight: "10px" }}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Отправка..." : "Опубликовать"}
                </button>
            </form>
        </div>
    );
};

export default VkPost;