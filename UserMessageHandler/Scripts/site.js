function getTable() {
    var statusInfo = [];
    var checkBoxList = document.getElementById('status-check').getElementsByClassName('checkbox');
    var range = document.getElementById('range-input').value;
    for (var i = 0; i < checkBoxList.length; i++) {
        if (checkBoxList[i].checked == true)
            statusInfo.push(i);
    }
    $.post('home/GetMessages', { statusInfo: statusInfo, range: range }, createTable);
}
function createTable(data) {
    clearTable();
    var table = $('#user-message-table');
    var row = $('<tr></tr>');
    row.attr('class', 'info-row');
    row.append('<td>userId</td><td>message</td><td>status</td><td></td>');
    table.append(row);

    for (var i = 0; i < data.length; i++) {
        var messRow = $('<tr></tr>');
        messRow.attr('class', 'message-row');
        messRow.attr('message-id', data[i].MessageId);
        messRow.append(`<td class="user-id-column">${data[i].UserId}</td>`);
        messRow.append(`<td class="message-column">${data[i].Message}</td>`);
        var selectColumn = $('<select class="select"></select>');
        for (var j = 0; j < messageStatuses.length; j++) {
            if (j == data[i].Status)
                selectColumn.append(`<option selected>${messageStatuses[j].name}</option>`);
            else
                selectColumn.append(`<option>${messageStatuses[j].name}</option>`);
        }
        var selecttd = $('<td></td>');
        selecttd.append(selectColumn);
        messRow.append(selecttd);
        var button = $('<button>change</button>');
        var buttontd = $('<td></td>');
        buttontd.attr('class', 'button-column');
        button.click(changeStatus);
        button.attr('class', 'status-change-button');
        buttontd.append(button);
        messRow.append(buttontd);
        table.append(messRow);
    }
}

function changeStatus() {
    var row = $(this).parents('.message-row');
    var select = row.children().children('.select');
    var status = messageStatuses.find(x => x.name == select[0].value).value;
    $.post('home/ChangeMessageStatus', { messageId: row.attr('message-id'), newMessageStatus: status }, getTable);
}

function clearTable() {
    $('#user-message-table').empty();
}

class ServerHubService {
    constructor() {
        var _connection = null;
        var _hub = null;
    }
    static setupHubConnection() {
        this._connection = $.hubConnection();
        this._hub = this._connection.createHubProxy("MainHub");
        this._hub.on("getMessage", () => { console.log("2")});
        this._connection.start();
        console.log("1");
    }
    static sendMessage() {
        this._hub.invoke("SendMessage");
    }
}