export const houseData: Decision = {
  choices: [
    { desc: "House A", ranks: [4, 3, 5] },
    { desc: "House B", ranks: [2, 5, 4] },
    { desc: "House C", ranks: [3, 4, 2] },
    { desc: "House D", ranks: [5, 2, 3] },
    { desc: "House E", ranks: [1, 3, 4] }, // Example: Bad location, average price, good condition
  ],
  criteria: [
    { desc: "Location", weight: 5 },
    { desc: "Price", weight: 3 },
    { desc: "Condition", weight: 4 },
  ],
};

export const jobData: Decision = {
  choices: [
    { desc: "Job Offer A", ranks: [5, 4, 3, 4] }, // Example: Great salary, good benefits, average commute, good work-life balance
    { desc: "Job Offer B", ranks: [3, 5, 2, 5] }, // Example: Average salary, excellent benefits, long commute, excellent work-life balance
    { desc: "Job Offer C", ranks: [4, 3, 5, 3] }, // Example: Good salary, average benefits, short commute, average work-life balance
    { desc: "Job Offer D", ranks: [2, 4, 4, 2] }, // Example: Low salary, good benefits, good commute, poor work-life balance
    { desc: "Job Offer E", ranks: [3, 3, 3, 5] }, // Example: Average salary, average benefits, average commute, excellent work-life balance
  ],
  criteria: [
    { desc: "Salary", weight: 5 },
    { desc: "Benefits", weight: 4 },
    { desc: "Commute", weight: 3 },
    { desc: "Work-Life Balance", weight: 5 },
  ],
};
