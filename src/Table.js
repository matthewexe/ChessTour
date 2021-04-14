class Table {
    constructor(
        HTMLTagNameMap,
        columns = ["Name", "Surname", "Nation", "ELO"]
    ) {
        this.tableElement = document.querySelector(HTMLTagNameMap);
        this.columns = this.setCol(columns);
        this.size = 0;
    }

    setCol(string) {
        this.columns = string;
        this.tableElement.innerHTML +=
            '<tr id="head">' +
            this.columns.map((value) => "<td>" + value + "</td>").join("") +
            "</tr>";
        return string;
    }

    addRow(data) {
        this.tableElement.innerHTML +=
            "<tr>" +
            data.map((value) => "<td>" + value + "</td>").join("") +
            '<td><i class="fas fa-trash"></i></td>' +
            "</tr>";

        this.size++;
    }

    getTable() {
        return this.tableElement;
    }
}

export { Table };
