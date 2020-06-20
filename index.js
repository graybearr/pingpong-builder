const fetch = require('node-fetch');

class PingPong {
    constructor(key, botId) {
        this.key = key
        this.botId = botId
    }

    async send(query, sessionId) {
        const headers = {
            'Authorization': `${this.key}`,
            'Content-Type': 'application/json'
        }

        const body = `{"request": {"query": "${query}"}}`

        const res = await fetch(`https://builder.pingpong.us/api/builder/${this.botId}/integration/v0.2/custom/${sessionId}`, {
            method: 'POST',
            headers: headers,
            body: body
        })

        const parsed = res.json()

        let result = {
            image: {
                url: null, //답변으로 제공된 이미지의 주소
                score: null,
                name: null,
                link: null,
                from: null,
                type: null
            },
            score: null, //해당 모듈의 머신러닝 모델 결과 값
            name: null, //모듈의 이름
            link: null, //제공되는 대화 시나리오 혹은 답변의 빌더 내 주소
            from: null, //해당 대화 시나리오 혹은 답변의 이름
            type: null, //답변의 형태
            text: null, //답변 내용
            brandMessage: null //브랜드 메시지 전송 여부
        }

        if (parsed.toString().includes('아무말에도 곧잘 대답하는 이 봇은 핑퐁 빌더로 만든 봇이에요')) {
            result.brandMessage = true
            result.text = parsed.response.replies[1].text
        } else {
            result.brandMessage = false
            result.text = parsed.response.replies[0].text
        }

        return result
    }
}

module.exports = PingPong