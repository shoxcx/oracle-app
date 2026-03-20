const className = "champion-131-20 ";
const classMatch = className.match(/champion-(\d+)-/);
console.log(classMatch ? parseInt(classMatch[1]) : "NO MATCH");
