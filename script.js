// Mock Student Database
const students = [
    { id: 1, name: "Aarav Sharma", roll: "CS-2026-01", attendance: 88, status: "Present" },
    { id: 2, name: "Priya Patel", roll: "CS-2026-02", attendance: 64, status: "Absent" },
    { id: 3, name: "Rohan Verma", roll: "CS-2026-03", attendance: 52, status: "Absent" },
    { id: 4, name: "Ananya Iyer", roll: "CS-2026-04", attendance: 92, status: "Present" },
    { id: 5, name: "Kabir Khan", roll: "CS-2026-05", attendance: 45, status: "Absent" }
];

// Load Dashboard Data (For index.html)
function loadDashboard() {
    const tableBody = document.getElementById("attendanceTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";
    let presentCount = 0;
    let absentCount = 0;

    students.forEach((student, index) => {
        if (student.status === "Present") presentCount++;
        else absentCount++;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td><span class="badge ${student.status === 'Present' ? 'success' : 'danger'}">${student.status}</span></td>
            <td>
                <button onclick="toggleAttendance(${index})" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Toggle Status</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById("totalStudents").innerText = students.length;
    document.getElementById("presentCount").innerText = presentCount;
    document.getElementById("absentCount").innerText = absentCount;
}

function toggleAttendance(index) {
    students[index].status = students[index].status === "Present" ? "Absent" : "Present";
    loadDashboard();
}

// Load Warnings Page Data (For warnings.html)
function loadWarningPage() {
    const studentSelect = document.getElementById("studentSelect");
    if (!studentSelect) return;

    // Populate Dropdown
    students.forEach(student => {
        const option = document.createElement("option");
        option.value = student.id;
        option.textContent = `${student.name} (${student.roll}) - Attendance: ${student.attendance}%`;
        studentSelect.appendChild(option);
    });

    studentSelect.addEventListener("change", updateEmailPreview);
    updateEmailPreview(); // Initial load
}

function updateEmailPreview() {
    const studentId = document.getElementById("studentSelect").value;
    const student = students.find(s => s.id == studentId);
    if (!student) return;

    const emailText = `Subject: URGENT: Attendance Warning Notice - ${student.name} (${student.roll})

Dear ${student.name},

This is an official notification from the College Academic Cell. Our records indicate that your current overall attendance has fallen to ${student.attendance}%. 

As per college guidelines, maintaining a minimum of 75% attendance is mandatory to appear for the upcoming end-semester examinations. Your current standing puts you at risk of detention.

Please meet your Faculty Advisor or Department Head by tomorrow to discuss corrective steps.

Regards,
Academic Administration Office
Apex Institute of Technology`;

    document.getElementById("emailPreview").innerText = emailText;
}

function sendWarningEmail() {
    alert("Warning email/notice has been successfully dispatched to the student's registered email address!");
}

// Auto-run appropriate function based on the active page
document.addEventListener("DOMContentLoaded", () => {
    loadDashboard();
    loadWarningPage();
});