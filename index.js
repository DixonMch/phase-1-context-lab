/* Your Code Here */
function createEmployeeRecord(record) {
    return {
      firstName: record[0],
      familyName: record[1],
      title: record[2],
      payPerHour: record[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(records) {
    return records.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date,
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date,
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find((event) => event.date === date);
    const timeOut = employee.timeOutEvents.find((event) => event.date === date);
    if (timeIn && timeOut) {
      return (timeOut.hour - timeIn.hour) / 100;
    } else {
      return 0;
    }
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map((event) => event.date);
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
  }
  
  function findEmployeeByFirstName(records, firstName) {
    return records.find((record) => record.firstName === firstName);
  }
  
  function calculatePayroll(records) {
    return records.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

