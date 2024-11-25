// popup.js

// 팝업 HTML을 로드하는 함수
function popup_loadHTML() {
    fetch('/html/common/popup.html') // popup.html의 경로 확인
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            popup_setupEvents(); // 팝업 이벤트 설정
        })
        .catch(error => {
            console.error("팝업 HTML을 로드하는 데 실패했습니다:", error);
        });
}

// 팝업 열기 함수
function popup_open(detailPageUrl) {
    const popupOverlay = document.getElementById('layerPopupOverlay');
    const popupContent = document.getElementById('layerPopupContent');

    if (popupOverlay && popupContent) {
        // 여기서 display 속성을 변경
        popupOverlay.style.display = 'flex'; 

        // 팝업 활성화 클래스를 추가하여 애니메이션 적용
        setTimeout(() => {
            popupOverlay.classList.add('show');
            document.getElementById('layerPopup').classList.add('show');
        }, 10);

        // 콘텐츠 로드
        fetch(detailPageUrl)
            .then(response => response.text())
            .then(html => {
                popupContent.innerHTML = html;
            })
            .catch(error => {
                popupContent.innerHTML = "<p>내용을 불러오는 데 실패했습니다.</p>";
                console.error("Error loading detail content:", error);
            });
    } else {
        console.error("팝업 요소가 로드되지 않았습니다.");
    }
}

// 팝업 닫기 함수
function popup_close() {
    const popupOverlay = document.getElementById('layerPopupOverlay');
    if (popupOverlay) {
        popupOverlay.style.display = 'none';
        document.getElementById('layerPopupContent').innerHTML = ''; // 콘텐츠 초기화
    }
}

// 팝업 닫기 버튼 이벤트 설정
function popup_setupEvents() {
    const closePopupBtn = document.getElementById('closeLayerPopup');
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', popup_close);
    }
}

// 페이지 로드 시 팝업 HTML을 동적으로 로드
document.addEventListener('DOMContentLoaded', () => {
    popup_loadHTML(); // 팝업 HTML을 로드
});
