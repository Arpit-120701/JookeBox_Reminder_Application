//allow users to add notifiaction 
if ("Notification" in window)
{
    Notification.requestPermission().then(function (permission)
{
    if(Notification.permission !== "granted")
    {
        alert("Please allow notification access !!");
        //location.reload()
    }
})
}

let timeoutIds = []

function scheduleReminder()
{
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;

    let dateTimeToString = date + " "+time;
    let scheduleTime = new Date(dateTimeToString)
    let currentTime = new Date()
    let timeDifference = scheduleTime - currentTime

    if(timeDifference > 0)
    {
        addReminder(title , description , dateTimeToString);

        var timeoutId = setTimeout(function (){
            document.getElementById("notificationSound").play();

            var notification = new Notification(title ,{
                body: description,
                requireInteraction: true,
            });
        }, timeDifference);

        timeoutIds.push(timeoutId);
        console.log("dgdg");
    }
    else{
        alert("The schedules time is in the past ")
    }


}

function  addReminder( title , description , dateTimeToString)
{
    var tableBody = document.getElementById("reminderTableBody")

    let row = tableBody.insertRow()

    let titleCell = row.insertCell(0)
    let descriptionCell = row.insertCell(1);
    let dateTimeCell = row.insertCell(2)
    let actionCell = row.insertCell(3)

    titleCell.innerHTML =title;
    descriptionCell.innerHTML=description
    dateTimeCell.innerHTML=dateTimeToString
    actionCell.innerHTML=`<button onClick= "deleteReminder(this)">Delete</button>`

}
function deleteReminder(button){
    var row = button.closest("tr")
    var index = row.rowIndex;
    console.log("ss");

    clearTimeout(timeoutIds[index - 1]);
    timeoutIds.splice(index -1, 1);
    row.remove()


}
