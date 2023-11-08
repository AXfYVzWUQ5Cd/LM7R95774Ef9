// ==UserScript==
// @name         아카라이브 깡계확인
// @namespace    http://kemomimi.com/
// @version      1.0
// @description  깡계확인 스크립트
// @match        https://arca.live/b/*/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const firstLink = document.querySelector('.info-row .user-info a');
if (firstLink) {
    const targetURL = firstLink.href;
    console.log('첫 번째 링크의 href:', targetURL);
    // GET 요청 보내기
    GM_xmlhttpRequest({
        method: 'GET',
        url: targetURL,
        onload: function(response) {
            const htmlData = response.responseText;
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlData, 'text/html');
            if(doc.querySelectorAll('.error-code').length >=1){
                firstLink.style.fontSize = '20px';
                firstLink.style.fontWeight = 'bold';
                firstLink.style.color = 'red';
                firstLink.style.textDecoration = 'line-through';
                firstLink.textContent += ' (삭제된 계정)';
                console.log("삭제된 계정");
            }else{
                const cardBlockElement = doc.querySelector('.card-block');
                const childNodes = cardBlockElement.childNodes;
                var post = 0
                var coment = 0
                var flag = 0
                for (const node of childNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if(node.className == "clearfix"){
                            flag+=1
                        }
                        if(node.className== "user-recent" && flag==0){
                            post+=1
                            console.log("게시글");
                        }else if(node.className== "user-recent" && flag==1){
                            coment+=1
                            console.log("덧글");
                        }
                    }
                }
                if(post<=14 || coment<=14){
                    firstLink.style.fontSize = '20px';
                    firstLink.style.fontWeight = 'bold';
                    firstLink.style.color = 'red';
                    firstLink.textContent += ' (최근 글:'+post+' 댓글:'+coment+')';
                }else{
                    //firstLink.textContent += ' (최근 글:'+post+' 댓글:'+coment+')';
                }
            }
        }
    });
} else {
    console.log('링크를 찾을 수 없음');
}