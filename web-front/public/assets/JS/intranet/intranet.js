// 페이지 이동을 위한 이벤트 설정 (초기화용)
function setupNavigation() {
    // .menu 내의 모든 <a> 태그에 대해 클릭 이벤트 설정
    document.querySelectorAll('.menu a').forEach(item => {
        item.removeEventListener('click', navigateToPage); // 기존 이벤트 제거
        item.addEventListener('click', navigateToPage);   // 새로운 이벤트 추가
    });

    // .logo 클릭 시 페이지 이동 설정
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.removeEventListener('click', navigateToPage); // 기존 이벤트 제거
        logo.addEventListener('click', navigateToPage);   // 새로운 이벤트 추가
    }
}

// 페이지 이동 함수
function navigateToPage(event) {
    event.preventDefault(); // 기본 링크 동작 방지
    const url = this.getAttribute('data-url'); // data-url 속성에서 URL 가져오기
    if (url) {
        // 절대 경로로 변환하여 페이지 이동
        window.location.href = new URL(url, window.location.origin); // URL을 절대 경로로 처리
    }
}

// 상세 페이지로 이동하는 함수
function handleDetailNavigation() {
    const detailPage = this.getAttribute('data-detail-page'); // 이동할 상세 페이지

    if (detailPage) {
        const url = new URL(detailPage, window.location.origin);
        // 페이지 이동
        window.location.href = url;
    }
}

// 페이지 이동과 팝업을 구분하여 클릭 이벤트 설정
function openDetail() {
    document.querySelectorAll('tr[data-detail-page]').forEach(row => {
        const isPopup = row.hasAttribute('data-popup'); // data-popup 속성 체크

        // data-popup 속성이 없는 경우에만 페이지 이동 이벤트 추가
        if (!isPopup) {
            row.removeEventListener('click', handleDetailNavigation); // 기존 이벤트 제거
            row.addEventListener('click', handleDetailNavigation);    // 페이지 이동 이벤트 추가
        }
    });
}

// 페이지 로드 시 이벤트 초기화
document.addEventListener('DOMContentLoaded', () => {
    openDetail(); // 테이블 행 클릭 시 이벤트 초기화
});

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

//popup 열기 닫기 ( 버튼 양식 )
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button[data-popup="true"]').forEach(button => {
        button.addEventListener('click', () => {
            const detailPage = button.getAttribute('data-detail-page'); // 버튼에 설정된 data-detail-page 속성에서 URL 가져오기
            popup_open(detailPage); // popup.js의 popup_open 함수 호출
        });
    });
});

// display flex로 변경
function invisible(id){
    let invisible = document.getElementById(id);
    invisible.style.display = 'flex';

}