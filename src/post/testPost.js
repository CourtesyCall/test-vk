import React, {useState} from 'react';
import axios from "axios";


// const code = 'vk1.a.sUT4u3mQp0LVfB8tlkzkeMmNzLyXruRYJqmeCgMxp9SbVrHS8Mt0k7qrI4NNQ-Xw8kRKko1jQIbaqHwwoX-EEtu6261lEQd39eYZGmwr0oQSovx5EgVn27oS8TembUiUdy2MKtTv9qvirKo20pQz_1NiSGkumFtAqSX72qPMaD04aUCnRD4gGj9VOGvlQN5aHgChXy9Nh33PrQdDhv9bEQ';
// const groudId = '228635250';
const TestPost = ({accessToken, userId}) => {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null);
    //
    // // Вставьте свой ключ доступа и ID сообщества
    // const ACCESS_TOKEN = "vk1.a.gclQeiudFoFcEikHkCdx0sfA6qgJCrgEQVGqEeZWKbgdLJfKzVdQgh2Kifo3WLFt8Gxh5xb27MsF13QF1s4GeKeNf5pa7Rqo2ZiI2bgv8A-dib_AO6syPjm_YnPR2SaJXdZjKEmS9dRiY5E8eSm5RZ9cGnFZ8FsuMUR39BKFM6xF8qd-IIDUGy6QyTauoMeqeyg0qIagOLQfyMCphgWu9g";
    const GROUP_ID = "-176833980"; // ID сообщества с отрицательным знаком
    //
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('token 2 - ' + accessToken)
        console.log('userId 2 - ' + userId)

        try {
            const response = await axios.get("https://api.vk.com/method/wall.post", {
                params: {
                    owner_id:GROUP_ID,
                    message: message,
                    access_token: accessToken,
                    from_group: 0,
                    v: "5.131",
                },
            });

            if (response.data.response) {
                setStatus("Пост успешно опубликован!");
                setMessage("");
            } else {
                setStatus("Ошибка: " + JSON.stringify(response.data));
            }
        } catch (error) {
            setStatus("Произошла ошибка: " + error);
        }
    };
    //
    return (
        <div style={{
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}>
            <h1 style={{
                fontSize: "24px",
                color: "#333",
                textAlign: "center",
                marginBottom: "20px",
            }}>Публикация постов в группу ВКонтакте</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <textarea
            rows="5"
            placeholder="Введите текст поста"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{
                padding: "10px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                resize: "none",
            }}
        ></textarea>
                <button
                    type="submit"
                    style={{
                        padding: "10px 15px",
                        fontSize: "16px",
                        color: "#fff",
                        backgroundColor: "#0363a4",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#45A049")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                >
                    Опубликовать
                </button>
            </form>
            {status && (
                <p style={{
                    marginTop: "20px",
                    fontSize: "14px",
                    color: status.includes("успешно") ? "#4CAF50" : "#E57373",
                    textAlign: "center",
                }}>
                    {status}
                </p>
            )}
        </div>
    );

};

export default TestPost;