/*
    파일명: 인트라넷 공통코드관리 페이지 js파일
    작성자명: 임현우
    등록일: 24.11.15
*/
document.addEventListener('DOMContentLoaded', () => {
    // "공통 그룹 코드" 및 "공통 상세 코드"의 행추가 및 저장 버튼 이벤트 추가
    document.getElementById('addRowButton').addEventListener('click', () => addRow('groupCodeTable', 'group'));
    document.getElementById('saveRowButton').addEventListener('click', () => saveTableData('groupCodeTable', 'group'));
    
    document.getElementById('addDetailRowButton').addEventListener('click', () => addRow('detailedCodeTable', 'detail'));
    document.getElementById('saveDetailRowButton').addEventListener('click', () => saveTableData('detailedCodeTable', 'detail'));

    // 각 테이블 셀에 수정 가능하게 하는 클릭 이벤트 추가
    applyEditableEvent('groupCodeTable', 'group');
    applyEditableEvent('detailedCodeTable', 'detail');
});

// 입력을 마치고 값을 업데이트하는 함수
function finishEdit(cell, inputOrSelect, row) {
    cell.innerText = inputOrSelect.value;
    row.classList.remove('editing-row');
}

// 특정 테이블의 셀에 클릭 이벤트를 추가하여 수정 가능하도록 설정하는 함수
function applyEditableEvent(tableId, tableType) {
    // 수정 가능한 열 인덱스 설정
    const editableColumns = tableType == 'group' 
        ? [1, 2, 3] // 공통 그룹 코드에서 수정 가능한 열 인덱스 (그룹코드, 코드명, 설명)
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // 공통 상세 코드에서 수정 가능한 열 인덱스 (상세코드, 상세코드명, 설명, 참조1 ~ 참조5 설명 포함)

    document.querySelectorAll(`#${tableId} tbody tr`).forEach(row => {
        row.querySelectorAll('td').forEach((cell, index) => {
            if (editableColumns.includes(index) || 
               (tableType == 'group' && (index == 4 || index == 5)) || 
               (tableType == 'detail' && (index == 14 || index == 15))) {
                cell.classList.add('editable');
                cell.addEventListener('click', function () {
                    if (cell.querySelector('input') || cell.querySelector('select')) return;

                    row.classList.add('editing-row');

                    let currentText = cell.innerText;
                    cell.innerText = '';

                    // `사용여부`, `삭제여부` 열인지 확인하여 콤보박스 설정
                    if ((tableType == 'group' && (index == 4 || index == 5)) || 
                        (tableType == 'detail' && (index == 14 || index == 15))) {
                        let select = document.createElement('select');
                        select.classList.add('editable-select');
                        select.style.width = '100%';

                        let optionY = document.createElement('option');
                        optionY.value = 'Y';
                        optionY.text = 'Y';
                        let optionN = document.createElement('option');
                        optionN.value = 'N';
                        optionN.text = 'N';

                        select.appendChild(optionY);
                        select.appendChild(optionN);
                        select.value = currentText;

                        cell.appendChild(select);
                        select.focus();
                        select.addEventListener('blur', () => finishEdit(cell, select, row));
                        select.addEventListener('change', () => finishEdit(cell, select, row));
                    } else {
                        let input = document.createElement('input');
                        input.type = 'text';
                        input.value = currentText;
                        input.style.width = '100%';
                        cell.appendChild(input);
                        input.focus();
                        input.addEventListener('blur', () => finishEdit(cell, input, row));
                        input.addEventListener('keypress', function (e) {
                            if (e.key == 'Enter') {
                                finishEdit(cell, input, row);
                            }
                        });
                    }
                });
            }
        });
    });
}

// 행을 추가하는 함수
function addRow(tableId, tableType) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    const newRow = document.createElement('tr');
    const rowCount = tableBody.children.length + 1;

    const cells = tableType == 'group'
        ? [rowCount, '', '', '', 'Y', 'N', new Date().toISOString().slice(0, 10)] // 공통 그룹 코드 테이블
        : [rowCount, '', '', '', '', '', '', '', '', '', '', '', '', '', 'Y', 'N', new Date().toISOString().slice(0, 10)]; // 공통 상세 코드 테이블

    cells.forEach((cellContent, index) => {
        const cell = document.createElement('td');
        
        // 행추가 시 그룹코드와 상세코드는 input으로 추가
        if ((tableType == 'group' && index == 1) || (tableType == 'detail' && index == 1)) {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = cellContent;
            input.style.width = '100%';
            cell.appendChild(input);
        } else {
            cell.innerHTML = cellContent;
        }

        // editable 클래스를 필요한 열에만 추가
        const editableColumns = tableType == 'group' ? [1, 2, 3] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        if (editableColumns.includes(index) || (tableType == 'group' && (index == 4 || index == 5)) || 
           (tableType == 'detail' && (index == 14 || index == 15))) {
            cell.classList.add('editable');
        }

        newRow.appendChild(cell);
    });

    tableBody.appendChild(newRow);

    // 새로 추가된 행에 대한 셀 수정 가능 이벤트 추가
    applyEditableEvent(tableId, tableType);
}

// 테이블 데이터를 저장하는 함수
function saveTableData(tableId, tableType) {
    const tableRows = document.querySelectorAll(`#${tableId} tbody tr`);
    const rowData = [];

    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowObj = tableType == 'group'
            ? { // 공통 그룹 코드 테이블의 데이터 구조
                no: cells[0].innerText,
                codeGroup: cells[1].innerText,
                codeName: cells[2].innerText,
                description: cells[3].innerText,
                usage: cells[4].innerText,
                deletion: cells[5].innerText,
                registrationDate: cells[6].innerText
            }
            : { // 공통 상세 코드 테이블의 데이터 구조
                no: cells[0].innerText,
                detailCode: cells[1].innerText,
                detailCodeName: cells[2].innerText,
                description: cells[3].innerText,
                reference1: cells[4].innerText,
                referenceDesc1: cells[5].innerText,
                reference2: cells[6].innerText,
                referenceDesc2: cells[7].innerText,
                reference3: cells[8].innerText,
                referenceDesc3: cells[9].innerText,
                reference4: cells[10].innerText,
                referenceDesc4: cells[11].innerText,
                reference5: cells[12].innerText,
                referenceDesc5: cells[13].innerText,
                usage: cells[14].innerText,
                deletion: cells[15].innerText,
                registrationDate: cells[16].innerText
            };

        rowData.push(rowObj);
    });

    console.log(`저장된 ${tableId} 데이터:`, rowData);
    alert(`${tableId} 테이블의 데이터가 저장되었습니다!`);
}
