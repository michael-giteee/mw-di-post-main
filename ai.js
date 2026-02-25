const chatArea = document.getElementById('chat-area');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

function addUserMessage(text) {
    const messageHtml = `
        <div class="user-message">
            <div class="message-bubble">${text}</div>
        </div>
    `;
    chatArea.innerHTML += messageHtml;

    chatArea.scrollTop = chatArea.scrollHeight;
}


function addAIMessage(text) {
    const messageHtml = `
        <div class="ai-message">
            <div class="avatar">AI</div>
            <div class="message-bubble">${text}</div>
        </div>
    `;
    chatArea.innerHTML += messageHtml;

    chatArea.scrollTop = chatArea.scrollHeight;
}


function processMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    addUserMessage(message);
    
 
    userInput.value = '';

    
    setTimeout(() => {
        let aiResponse = "Saya adalah Asisten Kebugaran AI Anda. Ada yang bisa saya bantu hari ini?";

        const lowerCaseMessage = message.toLowerCase(); 

        if (lowerCaseMessage.includes("ini ai apa") || lowerCaseMessage.includes("siapa kamu") || lowerCaseMessage.includes("kamu ini apa atau kamu siapa")) {
            aiResponse = "Saya adalah RepoSe, Asisten Postur Anda. Saya dirancang untuk menganalisis postur Anda (seperti Lordosis dan Forward Head Posture) dan merekomendasikan program latihan untuk koreksi postur dan kebugaran.";
        } 


        else if (lowerCaseMessage.includes("lordosis")) {
            aiResponse = "Lordosis adalah kelengkungan berlebihan ke dalam di punggung bawah. Latihan 'Dead Bug' sangat baik untuk memperkuat core dan mengoreksi Lordosis.";
        } else if (lowerCaseMessage.includes("latihan") || lowerCaseMessage.includes("program")) {
            aiResponse = "Anda bisa melihat kategori **'Koreksi Postur'** dan **'Stretching'** di halaman Latihan untuk memulai program Anda.";
        } else if (lowerCaseMessage.includes("sakit") || lowerCaseMessage.includes("nyeri") || lowerCaseMessage.includes("leher")) {
            aiResponse = "Jika Anda merasa sakit atau nyeri, selalu konsultasikan dengan profesional. Untuk mengurangi ketegangan leher, saya sarankan mencoba latihan **'Upper Trapezius Stretch'** yang dapat Anda temukan di bagian Peregangan.";
        } else if (lowerCaseMessage.includes("perut") || lowerCaseMessage.includes("abs") || lowerCaseMessage.includes("crunch")) {
            aiResponse = "Latihan yang paling efektif untuk menguatkan perut adalah **Crunch Kaki Diangkat** (seperti yang Anda lihat di demo) dan **Plank**. Pastikan punggung bawah Anda selalu menempel di matras.";
        }
        
        addAIMessage(aiResponse);
    }, 1000);
}

sendButton.addEventListener('click', processMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processMessage();
    }
});