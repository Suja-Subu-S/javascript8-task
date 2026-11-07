
const students = [
    {
        name: "Arun",
        maths: 85,
        science: 90,
        english: 88
    },
    {
        name: "Priya",
        maths: 95,
        science: 92,
        english: 96
    },
    {
        name: "Kumar",
        maths: 35,
        science: 45,
        english: 50
    },
    {
        name: "Divya",
        maths: 78,
        science: 82,
        english: 80
    },
    {
        name: "Rahul",
        maths: 65,
        science: 70,
        english: 60
    },
    {
        name: "Sneha",
        maths: 40,
        science: 38,
        english: 75
    }
];

console.log(students);
//step3
// Function to calculate total marks
const total = (s) => {
    return s.maths + s.science + s.english;
};

// Function to calculate average marks
const average = (s) => {
    return Number((total(s) / 3).toFixed(2));
};

// Function to calculate grade
const grade = (avg) => {
    return avg >= 90 ? "A" :
           avg >= 80 ? "B" :
           avg >= 70 ? "C" :
           avg >= 60 ? "D" :
           avg >= 40 ? "E" : "F";
};


// =====================================
// TEST THE FUNCTIONS
// =====================================

// Testing with first student (Arun)

console.log("STEP 3 OUTPUT:");

console.log("Name:", students[0].name);

console.log("Total:", total(students[0]));

console.log("Average:", average(students[0]));

console.log("Grade:", grade(average(students[0])));

//step-4

const report = students.map((s) => {

    
    const avg = average(s);
    return {
        name: s.name,
        total: total(s),
        average: avg,
        grade: grade(avg)
    };
});

console.log("STEP 4: STUDENT REPORT");
console.table(report);

//step-5
const passed = students.filter(s =>
    [s.maths, s.science, s.english].every(mark => mark >= 40)
);

const failed = students.filter(s =>
    [s.maths, s.science, s.english].some(mark => mark < 40)
);

console.log("STEP 5: PASSED STUDENTS");
console.table(passed);

console.log("Number of Failed Students:", failed.length);

//step-6
const classTotal = students.reduce((sum, s) => sum + total(s), 0);

const classAverage = classTotal / students.length;

const topper = students.reduce((top, s) =>
    total(s) > total(top) ? s : top
);

const mathsAverage = students.reduce((sum, s) => sum + s.maths, 0) / students.length;

const scienceAverage = students.reduce((sum, s) => sum + s.science, 0) / students.length;

const englishAverage = students.reduce((sum, s) => sum + s.english, 0) / students.length;

console.log(`Class Average: ${classAverage.toFixed(2)}`);
console.log(`Topper: ${topper.name}`);
console.log(`Topper Total: ${total(topper)}`);
console.log(`Maths Average: ${mathsAverage.toFixed(2)}`);
console.log(`Science Average: ${scienceAverage.toFixed(2)}`);
console.log(`English Average: ${englishAverage.toFixed(2)}`);

//step-7
const board = document.getElementById("board");

function showTable(list) {
    board.querySelector("tbody").innerHTML = list.map(s => `
        <tr>
            <td>${s.name}</td>
            <td>${s.total}</td>
            <td>${s.average}</td>
            <td>${s.grade}</td>
        </tr>
    `).join("");
}

document.getElementById("allBtn").addEventListener("click", () => {
    showTable(report);
});

document.getElementById("passedBtn").addEventListener("click", () => {
    showTable(report.filter(s =>
        students.find(student => student.name === s.name) &&
        passed.some(p => p.name === s.name)
    ));
});

document.getElementById("sortBtn").addEventListener("click", () => {
    showTable(ranked);
});

showTable(report);

//step-9
const jsonOutput = document.getElementById("json");

jsonOutput.textContent = JSON.stringify(report, null, 2);

const textarea = document.createElement("textarea");
textarea.id = "jsonInput";
textarea.placeholder = "Paste JSON here";
textarea.rows = 8;
textarea.cols = 50;

const parseBtn = document.createElement("button");
parseBtn.textContent = "Parse JSON";

const message = document.createElement("p");

document.body.appendChild(textarea);
document.body.appendChild(parseBtn);
document.body.appendChild(message);

parseBtn.addEventListener("click", () => {
    try {
        const parsedData = JSON.parse(textarea.value);
        message.textContent = "Valid JSON!";
        console.log("Parsed JSON:", parsedData);
    } catch (error) {
        message.textContent = "Invalid JSON! Please check your input.";
    }
});