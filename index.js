// Your code here
function createEmployeeRecord([firstname, familyname, title, rate]) {
    return {
        firstName: firstname,
        familyName: familyname,
        title: title,
        payPerHour: rate,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array){
    let newArray = []
    array.forEach((item) => {
        newArray.push(createEmployeeRecord(item))
    })
    return newArray
}

function createTimeInEvent(employee, date) {
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: Number(date.slice(11, 15)),
        date: date.slice(0, 10)
    })
    return employee
}

function createTimeOutEvent(employee, date) {
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(date.slice(11, 15)),
        date: date.slice(0, 10)
    })
    return employee
}

function hoursWorkedOnDate(employee, date) {
    // Find the timeIn and timeOut for the provided date
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);

    // Calculate the hours worked by subtracting the in time from the out time
    let hoursWorked = (timeOut.hour - timeIn.hour) / 100;  // Dividing by 100 because hours are stored as 4-digit numbers like 0900 or 2100

    return hoursWorked
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// Earns 324
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
// Earns 54
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")

function allWagesFor(employee) {
    let totalPay = 0
    employee.timeInEvents.forEach((dateObj) => {
        totalPay += wagesEarnedOnDate(employee, dateObj.date)
    })
    return totalPay 
}
console.log(allWagesFor(cRecord))
function calculatePayroll(employees) {
    return employees.reduce((accum, employee) => {
        let pay = allWagesFor(employee)
        return accum + pay
    }, 0)
}