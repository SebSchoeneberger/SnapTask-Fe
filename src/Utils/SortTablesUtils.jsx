const sortTables = (table, key, sortOrder) => {
  const sortedTable = [...table].sort((a, b) => {
    let valueA, valueB;

    if (key === "dueDate" || key === "createdAt") {
      valueA = new Date(a[key]);
      valueB = new Date(b[key]);
    } else if (key === "isDelayed") {
      valueA = new Date(a.dueDate) < new Date() ? "Yes" : "No";
      valueB = new Date(b.dueDate) < new Date() ? "Yes" : "No";
    } else if (key === "assignedTo.firstName") {
      valueA = a.assignedTo.length > 0 ? a.assignedTo[0].firstName.toUpperCase() : "";
      valueB = b.assignedTo.length > 0 ? b.assignedTo[0].firstName.toUpperCase() : "";
    } else if (key.includes(".")) {
      const keys = key.split(".");
      valueA = keys.reduce((obj, keyPart) => obj && obj[keyPart], a);
      valueB = keys.reduce((obj, keyPart) => obj && obj[keyPart], b);
    } else {
      valueA = a[key] ? a[key].toString().toUpperCase() : "";
      valueB = b[key] ? b[key].toString().toUpperCase() : "";
    }

    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  return sortedTable;
};

export default sortTables;

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}
