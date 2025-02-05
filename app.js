// app.js
document.addEventListener('DOMContentLoaded', () => {
  const fetchButton = document.getElementById('fetchMessage');
  const updateButton = document.getElementById('updateMessage');
  const deleteButton = document.getElementById('deleteMessage');
  const messageDisplay = document.getElementById('messageDisplay');

  // 서버로부터 메시지 가져오기
  fetchButton.addEventListener('click', async () => {
    const message = await axios.get('http://localhost:3000')
    const Len = Object.keys(message.data).length
    messageDisplay.textContent = Len ? message.data.message : "메세지가 없습니다";
  })

  // 서버에 메시지 업데이트 요청 보내기
  updateButton.addEventListener('click', async () => {
    const newMessage = prompt('새로운 메시지를 입력하세요:');
    if (newMessage) {
      return axios.put('http://localhost:3000', { newMessage })
        .then(res => messageDisplay.textContent = res.data)
    }
  });

  // 서버에 메시지 삭제 요청 보내기
  deleteButton.addEventListener('click', async () => {
    messageDisplay.textContent = (await axios.delete('http://localhost:3000')).data
  });
});
