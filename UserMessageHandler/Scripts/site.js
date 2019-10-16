$(function () {
    window.serverHub = new ServerHubService();
});

function getTable() {
    var statusInfo = [];
    var checkBoxList = $('#status-check .checkbox');
    var messagesCount = $('#count-input')[0].value;
    for (var i = 0; i < checkBoxList.length; i++) {
        if (checkBoxList[i].checked) {
            statusInfo.push(i);
        }
    }
    $.post('home/GetMessages', { statusInfo: statusInfo, messagesCount: messagesCount }, createTable);
}

function createTable(data) {
    clearTable();
    var table = $('#user-message-table');
    var row = $('<tr></tr>');
    row.addClass('info-row');
    row.append('<td>userId</td><td>message</td><td>status</td><td></td>');
    table.append(row);

    for (var i = 0; i < data.length; i++) {
        var messRow = $('<tr></tr>');
        messRow.addClass('message-row');
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
        buttontd.addClass('button-column');
        button.click(changeStatus);
        button.addClass('status-change-button');
        buttontd.append(button);
        messRow.append(buttontd);
        table.append(messRow);
    }
}

function changeStatus() {
    var row = $(this).parents('.message-row');
    var select = row.find('.select');
    var status = messageStatuses.find(x => x.name == select[0].value).value;
    $.post('home/ChangeMessageStatus', { messageId: row.attr('message-id'), newMessageStatus: status }, getTable);
}

function clearTable() {
    $('#user-message-table').empty();
}

class ServerHubService {
    constructor() {
        this._connection = null;
        this._hub = null;
    }

    setupHubConnection() {
        this._connection = $.hubConnection();
        this._hub = this._connection.createHubProxy("MainHub");
        this._hub.on("Test", () => { console.log("Test") });
        this._connection.start();
        console.log("connection set succsessfully");
    }

    sendMessage() {
        this._hub.invoke("SendMessage");
    }
}