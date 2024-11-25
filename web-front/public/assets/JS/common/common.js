// 페이지 이동을 위한 이벤트 설정 (초기화용)
function setupNavigation() {
    // .nav-links div에 대해 클릭 이벤트 설정
    document.querySelectorAll('.nav-links div').forEach(item => {
        item.removeEventListener('click', navigateToPage); // 기존 이벤트 제거
        item.addEventListener('click', navigateToPage);   // 새로운 이벤트 추가
    });

    // .nav-item에 대해 클릭 이벤트 설정
    document.querySelectorAll('.nav-item').forEach(item => {
        item.removeEventListener('click', navigateToPage); // 기존 이벤트 제거
        item.addEventListener('click', navigateToPage);    // 새로운 이벤트 추가
    });
}

// 페이지 이동 함수
function navigateToPage() {
    const url = this.getAttribute('data-url'); // data-url 속성에서 URL 가져오기
    if (url) {
        // 절대 경로로 변환하여 페이지 이동
        window.location.href = new URL(url, window.location.origin); // URL을 절대 경로로 처리
    }
}

// header 서브메뉴 및 페이지 이동 처리
fetch('/html/common/header.html') // 경로를 절대 경로로 변경
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data; // header.html 삽입

        // 페이지 이동 이벤트를 초기화
        setupNavigation(); // 새로 삽입된 요소들에 대해 이벤트 리스너를 설정
    })
    .catch(error => console.error('Error loading header:', error)); // 오류 처리


// popup 열기 닫기
// intranet.js
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('tr[data-popup="true"]').forEach(row => {
        row.addEventListener('click', () => {
            const detailPage = row.getAttribute('data-detail-page');
            popup_open(detailPage); // popup.js의 popup_open 함수 호출
        });
    });
});
// 공지사항 tr 이동시키기
document.addEventListener('DOMContentLoaded', () => {
    // 모든 <tr> 요소에 대해 이벤트 리스너 추가
    document.querySelectorAll('tr[data-url]').forEach(tr => {
        tr.addEventListener('click', () => {
            const url = tr.getAttribute('data-url'); // data-url 속성에서 URL 가져오기
            if (url) {
                window.location.href = url; // 해당 URL로 페이지 이동
            } else {
                console.error('No URL specified for this row.');
            }
        });
    });
});
